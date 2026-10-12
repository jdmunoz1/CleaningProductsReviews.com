import re, glob, os
from collections import defaultdict
base = r'C:/Users/juand/CleaningProductsReviews.com/src/content'

def split_objects(s):
    objs = []
    depth = 0
    start = None
    for idx, ch in enumerate(s):
        if ch == '{':
            if depth == 0:
                start = idx
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start is not None:
                objs.append(s[start:idx + 1])
                start = None
    return objs

def field(obj, name):
    m = re.search(r'\b' + re.escape(name) + r':\s*"([^"]*)"', obj)
    return m.group(1) if m else None

owner = {}
for f in glob.glob(base + '/parts/categories/*.ts'):
    s = open(f, encoding='utf-8').read()
    key = os.path.basename(f)
    for m in re.finditer(r'slug:\s*"([^"]+)"', s):
        owner[m.group(1)] = key
src = open(base + '/products.ts', encoding='utf-8').read()
prod_cat = {m.group(1): m.group(2) for m in re.finditer(r'p\(\s*"([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]+)"', src)}

CLUSTERS = {
    'machines': lambda f: f in ('01-machines.ts','02-vacuums.ts','11-vac-subhubs.ts','12-vac-subhubs2.ts','13-vac-upright.ts','13-floor-subhubs.ts','14-floor-subhubs.ts','14-floor-subhubs2.ts'),
    'floor-carpet': lambda f: f in ('03-floor-carpet.ts',),
    'kitchen': lambda f: f.startswith(('15-','21-')) or f in ('04-kitchen.ts',),
    'bathroom': lambda f: f in ('05-bathroom.ts','16-bath-subhubs.ts','23-bathroom-subhubs.ts','28-bathroom-more.ts'),
    'pet': lambda f: f in ('06-pet-cleaning.ts','17-pet-mops.ts','26-pet-subhubs.ts'),
    'eco': lambda f: f in ('07-eco.ts','22-eco-subhubs.ts','29-eco-more.ts'),
    'tools': lambda f: f in ('08-tools.ts','18-tools-subhubs.ts','27-tools-subhubs.ts') or f.startswith('27-'),
    'laundry': lambda f: f.startswith(('19-','20-','24-')) or f in ('09-laundry.ts',),
    'specialist': lambda f: f in ('10-specialist.ts','25-specialist-subhubs.ts'),
}

def classify(catfile):
    catfile = catfile or 'unknown'
    for name, fn in CLUSTERS.items():
        if fn(catfile):
            return name
    return catfile

cl = defaultdict(int)
kinds = [('reviews','reviews'), ('best','best'), ('comparisons','comparisons'), ('guides','guides'), ('brands','brands'), ('categories','categories')]
for kind, slugdir in kinds:
    for f in glob.glob(base + '/parts/' + slugdir + '/*.ts'):
        s = open(f, encoding='utf8').read()
        for obj in split_objects(s):
            slug = field(obj, 'slug')
            if slug is None:
                continue
            if kind == 'reviews':
                catf = owner.get(prod_cat.get(slug))
            elif kind == 'categories':
                catf = os.path.basename(f)
            elif kind == 'brands':
                p = re.search(r'products:\s*\[([^\]]*)\]', obj)
                names = re.findall(r'"([^"]+)"', p.group(1)) if p else []
                first = names[0] if names else None
                catf = owner.get(prod_cat.get(first))
            else:
                catf = owner.get(field(obj, 'category'))
            cl[classify(catf)] += 1

for k, v in sorted(cl.items(), key=lambda x: -x[1]):
    print(str(k).ljust(28), v)
print("total", sum(cl.values()))
