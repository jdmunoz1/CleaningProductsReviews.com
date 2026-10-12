/* Page inventory counter: prints how many pages each content type generates. */
import { categories } from "../src/content/categories";
import { products } from "../src/content/products";
import { reviews } from "../src/content/reviews";
import { bestLists } from "../src/content/best";
import { comparisons } from "../src/content/comparisons";
import { guides } from "../src/content/guides";
import { brands } from "../src/content/brands";

const rows = [
  ["categories", Object.keys(categories).length],
  ["reviews", reviews.length],
  ["best lists", bestLists.length],
  ["comparisons", comparisons.length],
  ["guides", guides.length],
  ["brands", brands.length],
  ["products", products.length],
];
const totalPages = rows.reduce((n, [, c]) => n + c, 0) + 12; // static pages
for (const [label, n] of rows) console.log(label.padEnd(14), n);
console.log("----".padEnd(14), "----");
console.log("(static info pages)".padEnd(14), "12");
console.log("----".padEnd(14), "----");
console.log("approx total pages".padEnd(14), totalPages);
