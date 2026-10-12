import re, glob, os
from collections import defaultdict
base = r'C:/Users/juand/CleaningProductsReviews.com/src/content'
owner = {}
for f in glob.glob(base + '/parts/categories/*.ts'):
    s = open(f, encoding='utf-8').read()
    key = os.path.basename(f)
    for m in re.finditer(r'slug:\s*"([^"]+)"', s):
        owner[m.group(1)] = key
src = open(base + '/products.ts', encoding='utf-8').read()
prod_cat = {m.group(1): m.group(2) for m in re.finditer(r'p\(\s*"([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]+)"', src)}

# Per SUB-CATEGORY page counts (not clusters)
cat_pages = defaultdict(int)
kinds = [('reviews','/parts/reviews/'), ('best','/parts/best/'), ('comparisons','/parts/comparisons/'), ('guides','/parts/guides/'), ('brands','/parts/brands/'), ('categories','/parts/categories/')]
for kind, dirn in kinds:
    for f in glob.glob(base + dirn + '*.ts'):
        s = open(f, encoding='utf8').read()
        objs = []
        depth = 0
        for idx, ch in enumerate(s):
            pass
        # simpler: count slug fields for category objs, else category: fields
        if kind == 'categories':
            for m in re.finditer(r'slug:\s*"([^"]+)"', s):
                cat_pages['cat:' + m.group(1)] += 1
        elif kind == 'reviews':
            for m in re.finditer(r'slug:\s*"([^"]+)"', s):
                catf = owner.get(prod_cat.get(m.group(1)) or '')
                cat_pages[catf + ' -> ' + (prod_cat.get(m.group(1)) or '')] += 1
        else:
            for m in re.finditer(r'category:\s*"([^"]+)"', s):
                cat_pages[(owner.get(m.group(1)) or '?') + ' -> ' + m.group(1)] += 1

# aggregate leaf categories
leaf = defaultdict(int)
for k, v in list(cat_pages.items()):
    if ' -> ' in k:
        f, c = k.split(' -> ', 1)
        leaf[c] += v

print("=== per sub-category page count (all) ===")
for c, v in sorted(leaf.items(), key=lambda x: x[1]):
    print(str(c).ljust(30), v)
print("total subcat-mapped", sum(leaf.values()))
