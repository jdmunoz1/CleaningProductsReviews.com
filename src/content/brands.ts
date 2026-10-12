import type { Brand, Block } from "./types";
const P = (text: string): Block => ({ type: "p", text });
export const brands: Brand[] = [
{
  slug: "eureka",
  name: "Eureka",
  short: "The value vacuum brand that brought canister reach and bagless convenience to everyday budgets.",
  intro: [
    P("Eureka is the long-running value name in vacuums — the brand that consistently pairs straightforward bagless cleaning with budget-friendly pricing and approachable features, from sticks and uprights to canister machines."),
  ],
  body: [
    P("The WhirlWind canister is where Eureka's value thesis shines: a telescopic wand and lightweight body that bring proper canister reach to hard floors and under furniture without a premium label price."),
    P("We cover Eureka honestly — it's the sensible-value pick rather than the luxury flagship, which suits households that want reliable cleaning without overspending."),
  ],
  products: ["eureka-whirlwind-canister"],
  updated: "2025-07-14",
},
{
  slug: "dyson",
  name: "Dyson",
  short: "Flagship cordless and innovative machine engineering.",
  intro: [
    P("Dyson is the premium reference point in the vacuum world — famous for ball technology, cyclone separation and, more recently, laser-powered cordless machines with live particle counting. The brand commands a premium and the specs justify conversation if you use the features. This page collects our research-based thinking on the Dyson models we cover."),
  ],
  body: [
    P("Dyson's engine: cyclone technology claims to maintain suction, and the V15 family adds laser floor detection plus a display that reveals dust you can't see. The honest framing: Dyson is best-in-class for the experience — the laser, the display, the build — if you can afford it."),
    P("For pet homes, the hair screw tool and HEPA filter options matter more than the headline figures. For hard floors the laser slim head is the standout feature."),
  ],
  products: ["dyson-v15-detect", "dyson-v8-origin", "dyson-ball-upright"],
  updated: "2025-07-14",
},
{
  slug: "ridgid",
  name: "Ridgid",
  short: "The Home Depot house brand for pro-grade yet affordable wet/dry shop vacuums.",
  intro: [
    P("Ridgid is The Home Depot's own-brand workhorse — reliable power tools and wet/dry vacuums built to a job-site standard at a more accessible price. In the garage and workshop, Ridgid's shop vacs are the everyday default."),
  ],
  body: [
    P("The 5-gallon wet/dry sums up the brand: a rugged tank that swallows both dry debris and wet spills, a wire-reinforced hose that holds its position, and an accessory system that makes one motor into a full workshop toolkit."),
    P("We frame Ridgid honestly — it's a workshop and car-detail tool more than a living-room vacuum, which is exactly where it earns its keep."),
  ],
  products: ["ridgid-5-gal-wetdry"],
  updated: "2025-07-14",
},
{
  slug: "dyson",
  name: "Dyson",
  short: "Flagship cordless and innovative machine engineering.",
  intro: [
    P("Dyson is the premium reference point in the vacuum world — famous for ball technology, cyclone separation and, more recently, laser-powered cordless machines with live particle counting. The brand commands a premium and the specs justify conversation if you use the features. This page collects our research-based thinking on the Dyson models we cover."),
  ],
  body: [
    P("Dyson's engine: cyclone technology claims to maintain suction, and the V15 family adds laser floor detection plus a display that reveals dust you can't see. The honest framing: Dyson is best-in-class for the experience — the laser, the display, the build — if you can afford it."),
    P("For pet homes, the hair screw tool and HEPA filter options matter more than the headline figures. For hard floors the laser slim head is the standout feature."),
  ],
  products: ["dyson-v15-detect", "dyson-v8-origin"],
  updated: "2025-06-01",
},
{
  slug: "shark",
  name: "Shark",
  short: "Mainstream-value vacuums with self-cleaning tech and power at a friendly price.",
  intro: [
    P("Shark is the counterweight to the premium flagships: genuinely capable machines — including self-cleaning brushrolls and anti-allergen seals — at a price most homes can actually pay. Shark splits the difference on the value-versus-flagship question better than almost anyone."),
  ],
  body: [
    P("Shark's best-known strength: the self-cleaning brushroll that keeps pet hair from tangling, sold on the mainstream Stratos and Navigator lines. Their uprights like the Navigator lift-away keep the classic cleaning power while making stairs and above-floor work easy."),
    P("Shark steam mops round out the floor-care line, bringing the same value-first approach to sealed hard floors."),
  ],
  products: ["shark-stratos", "shark-navigator-lift-away", "shark-steam-pocket-s3"],
  updated: "2025-06-01",
},
{
  slug: "bissell",
  name: "Bissell",
  short: "Pet-friendly vacuums, carpet cleaners and spot machines for the average home.",
  intro: [
    P("Bissell is the household name for practical cleaning: carpet cleaners, spot extractors, upright vacuums, steam and crosswave machines that lean toward real homes and real messes. Their pet-focused lineup is a fixture of the category, and the brand's charitable pet-support angle is genuine."),
  ],
  body: [
    P("Bissell's strength is cassette presence: the ProHeat carpet cleaner line, the Little Green portable spot cleaner, the CrossWave multi-surface scrub-and-suck, and the SpinWave scrubbing mop. If a cleaning problem has a Bissell, the Bissell is usually the accessible answer."),
    P("We cover the brand's vacuums too — from the cleanview upright to the AirRam cordless — because for most homes Bissell's value ratio is hard to beat."),
  ],
  products: ["bissell-cleanview", "bissell-airram", "bissell-proheat-2x-revolution", "bissell-little-green", "bissell-crosswave", "bissell-spinwave", "bissell-steambuddy"],
  updated: "2025-06-01",
},
{
  slug: "hoover",
  name: "Hoover",
  short: "The established name for reliable uprights, carpet cleaners and wet/dry vacuums.",
  intro: [
    P("Hoover is one of the oldest names in the category — the vacuum brand that built the reputation for capable, no-nonsense cleaning at fair prices. From windtunnel uprights to carpet cleaners and wet/dry shop vacs, Hoover covers the practical range."),
  ],
  body: [
    P("Hoover's uprights (the WindTunnel family) are mainstream favourites for whole-home carpet and hard-floor mixtures; their carpet cleaners carry the same reliability; and their shop vacuums are staples of garage duty."),
    P("The brand's portable spot cleaners like the SpotClean bring the incident-scale answer to carpet and upholstery stains."),
  ],
  products: ["hoover-windtunnel", "hoover-power-scrub-deluxe", "hoover-spotclean"],
  updated: "2025-06-01",
},
{
  slug: "miele",
  name: "Miele",
  short: "German premium canisters and bagged vacuums built to last.",
  intro: [
    P("Miele is the premium canister reference: German engineering, sealed bagged systems, exceptional filtration and a reputation for machines that last for decades. If your floors are hard and your priorities include longevity and dust containment, Miele is the benchmark."),
  ],
  body: [
    P("The Complete C3 series is Miele's flagship canister line — powered floor brushes for carpet, parquet heads for wood, and a bag system that keeps dust completely out of the air and out of the change."),
    P("The honest trade-offs: premium pricing, the bag cost, and the fact that it's a canister — which suits hard floors and furniture-heavy homes more than wall-to-wall carpet."),
  ],
  products: ["miele-complete-c3"],
  updated: "2025-06-01",
},
{
  slug: "roborock",
  name: "Roborock",
  short: "Feature-dense robot vacuums with strong mapping and mopping options.",
  intro: [
    P("Roborock is one of the leading names in robot vacuum tech — known for detailed LiDAR mapping, strong suction, and robot-mop hybrids that wash hard floors on a schedule. The brand's feature-per-dollar ratio is a big part of its appeal."),
  ],
  body: [
    P("The Q Revo series exemplifies the modern all-rounder: mapping, self-emptying, obstacle avoidance and a rotating mop system for hard floors. For homes that want the floor handled daily with minimal hands-on time, Roborock's mid-tier models are a genuine rival to the flagships."),
    P("Honest considerations: app-first setup, ongoing filter and dock maintenance, and a mopping-first design that suits hard floors better than deep carpet."),
  ],
  products: ["roborock-q-revo"],
  updated: "2025-06-01",
},
{
  slug: "iRobot",
  name: "iRobot",
  short: "The Roomba brand — the original robot vacuum, still a pioneer.",
  intro: [
    P("iRobot is the company that invented the home robot vacuum. The Roomba line remains one of the most-recognised names in cleaning, with a reputation for dependable mapping, strong app integration and a huge community of accessories."),
  ],
  body: [
    P("Roombas are the mainstream answer to robot vacuuming: well-tested navigation, self-emptying variants, and compatibility with smart-home assistants. They're reliable more than spec-flashy."),
    P("Owners commonly note the brand's consistency over raw max-suction numbers; the trade-off is a premium for the nameplate."),
  ],
  products: ["iroomba-roomba"],
  updated: "2025-06-01",
},
{
  slug: "eufy",
  name: "eufy",
  short: "Budget-friendly robots and cordless vacuums from the Anker stable.",
  intro: [
    P("eufy, from the Anker family, brings dependable robot and cordless vacuums at approachable prices. The brand's niche is genuinely capable hardware that undercuts the premium robots without cutting the basics."),
  ],
  body: [
    P("eufy robot vacuums deliver solid mapping and dual-roller pickup at a fraction of the top-line price, making them the sensible pick for first-time robot buyers. The trade-off is fewer self-emptying and mopping extras at the budget tier."),
    P("We cover eufy's robovac X8, which shows how far the budget segment has come."),
  ],
  products: ["eufy-robovac-x8"],
  updated: "2025-06-01",
},
{
  slug: "karcher",
  name: "Kärcher",
  short: "German pressure washers and scrubbers — pro-grade quality for the home.",
  intro: [
    P("Kärcher is the pressure washer benchmark. The German brand is trusted across pro and home settings for reliability, parts support and genuinely useful design — from their compact K series to heavy-duty gas models."),
  ],
  body: [
    P("The K5 series sits in the sweet spot for suburban patios, driveways and cars — with enough pressure for green and grime while staying manageable for one person."),
    P("Kärcher also makes window and floor machines; their pressure washer range is where the brand's engineering reputation shows clearest."),
  ],
  products: ["karcher-k5"],
  updated: "2025-06-01",
},
{
  slug: "tineco",
  name: "Tineco",
  short: "Smart cordless vac-mops and wet-dry floor machines with sensors and displays.",
  intro: [
    P("Tineco is a rising name in smart vacuuming — famous for cordless vac-mop machines that sense how dirty the floor is and adjust water and suction automatically, all shown on a live display."),
  ],
  body: [
    P("The Floor One S7 is the flagship: wet-dry one-pass cleaning, iLoop dirt sensing, a self-cleaning roller, and edge-to-edge reach on sealed hard floors. It's the machine for hard-floor- dominant modern homes."),
    P("Honest framing: it's a hard-floor machine, not a carpet deep-cleaner; area rugs need the machine's rug mode and low pile only."),
  ],
  products: ["tineco-floor-one-s7", "tineco-carpet-one"],
  updated: "2025-06-01",
},
{
  slug: "dawn",
  name: "Dawn",
  short: "The dish soap and Powerwash degreaser that's a kitchen legend.",
  intro: [
    P("Dawn is one of those cleaning products with a genuine legend attached — the degreasing dish soap that has been a kitchen staple for generations, and its modern pour-and-spray Powerwash that turns dish duty into quick work."),
  ],
  body: [
    P("Dawn's reputation rests on surfactant power: it cuts grease like nothing else on the shelf, which is why it also shows up in stain pre-treatment and even pet rescue folklore."),
    P("The Powerwash refillable spray brings that degreasing to counters and cooktops with deposit-and- dwell convenience. Modern formulas hide a strong pre-soak ingredient under the same familiar bottle."),
  ],
  products: ["dawn-powerwash"],
  updated: "2025-06-01",
},
{
  slug: "bar-keepers-friend",
  name: "Bar Keepers Friend",
  short: "The restoration powder that rescues sinks, cooktops and porcelain.",
  intro: [
    P("Bar Keepers Friend is the beloved powdered cleanser built on oxalic acid — the chemistry that lifts watermarks, rust and tarnish off stainless, porcelain and ceramic without a harsh abrasive."),
  ],
  body: [
    P("The classic can is the professional's restoration hack: it returns a stained stainless sink or porcelain cooktop to near-new with a paste and a little elbow grease."),
    P("The honest warning follows the power: acid chemistry must never touch marble or stone, and rinsing plus ventilation matter. For its rescue power, it's one of the best value-per-gram products on the shelf."),
  ],
  products: ["bar-keepers-friend"],
  updated: "2025-06-01",
},
{
  slug: "p-and-g",
  name: "P&G",
  short: "The laundry and home-giant behind Tide, Dawn, Swiffer and Downy.",
  intro: [
    P("Procter & Gamble is the giant behind a remarkable slice of the household-cleaning shelf: Tide detergents, Dawn dish soap, Swiffer sweepers and Downy softeners/boosters. If you clean a home, you almost certainly clean with P&G several times a week."),
  ],
  body: [
    P("The brands matter more than the parent for buyers, but P&G's engineering budget is real: Tide's enzyme systems and Hygienic Clean odour technology, Swiffer's pad-based floor system, and Downy Unstopables' long-release fragrance tech all come from the same lab pipeline."),
    P("We cover the P&G products in our catalog with the same research-based scrutiny as any other brand."),
  ],
  products: ["tide-hygienic-clean", "tide-to-go", "dawn-powerwash", "swiffer-sweeper", "downy-unstopables", "downy-rinse-and-refresh"],
  updated: "2025-06-01",
},
{
  slug: "clorox",
  name: "Clorox",
  short: "Bleach and disinfecting heritage, plus toilet and surface care.",
  intro: [
    P("Clorox is the name most people think of for bleach and disinfecting, and the brand has extended that trust across toilet cleaners, surface wipes and bathroom care. Their position is hygiene-first chemistry."),
  ],
  body: [
    P("Clorox toilet bowl cleaners combine the disinfecting expectation with convenience formats — the Wand and rim gels bring the chemistry closer than a bottle-and-brush ever did."),
    P("We cover Clorox with the same health-and-surface caution the brand's chemistry warrants: powerful, effective, and always best used with ventilation and label respect."),
  ],
  products: ["clorox-toilet-bowl", "tilex-mold-mildew", "formula-409"],
  updated: "2025-06-01",
},
{
  slug: "e-cloth",
  name: "E-Cloth",
  short: "The premium microfiber specialist whose high-grade weave cleans surfaces with water alone.",
  intro: [
    P("E-Cloth is the premium name in microfiber, built around a high-grade weave that holds more per swipe, so water becomes the active cleaner. The result is streak-free glass, clean countertops and appliance fronts — no polish, no solvent."),
  ],
  body: [
    P("The brand's whole proposition is replacing spray-plus-paper rituals across glass, counters and appliance fronts with one damp cloth that deep-cleans and shines. Machine-wash and it lasts for years of reuse, which is where the premium price pays off."),
    P("We cover E-Cloth honestly — it's the cloth upgrade, not a miracle: heavy grease still merits an oil-cleaning cloth, but for the streak-free surfaces that matter daily it earns its shelf-slot."),
  ],
  products: ["e-cloth-microfiber"],
  updated: "2025-07-14",
},
{
  slug: "libman",
  name: "Libman",
  short: "The cleaning-tools brand whose angle brooms and wonder mop keep everyday chores simple.",
  intro: [
    P("Libman makes the everyday cleaning-tool staples around a simple thesis: a handful of well-made, budget-friendly pieces that do one job well. The angle broom and mop are the household names of that lineup."),
  ],
  body: [
    P("The angle broom brings corner-reaching bristles and an integrated dust pan to daily sweeping; the Wonder Mop brings a self-wringing head to kitchen and bath floors. Neither is flashy — both are dependable, which is exactly the point."),
    P("That value positioning is the brand: durable basics at budget-friendly prices for kitchens, garages and daily hard floors."),
  ],
  products: ["libman-broom", "libman-wonder-mop"],
  updated: "2025-07-14",
},
{
  slug: "scrub-daddy",
  name: "Scrub Daddy",
  short: "The smiley-face scrub sponge that turns firm in cold water and soft in warm.",
  intro: [
    P("Scrub Daddy is the smiley-face sponge that turned a kitchen tool into a famous one: a water-activated foam scrubber that holds its shape, changes firmness with water temperature, and cleans without scratches."),
  ],
  body: [
    P("Behind the grin is a real material story: firm when cold, flexible when warm, and a long-wearing foam that holds its edge on pots, pans and sinks. It cleaned up the sponge aisle on function, not just novelty."),
    P("We cover Scrub Daddy with the same scrutiny as any scrubber — abrasiveness is still real, so non-stick pans get a light hand first."),
  ],
  products: ["scrub-daddy"],
  updated: "2025-07-14",
},
{
  slug: "shopvac",
  name: "Shop-Vac",
  short: "The original wet/dry shop vacuum brand — workhorse bins for garage and job scale.",
  intro: [
    P("Shop-Vac effectively owns the wet/dry category's generic name: it's the brand that defined the shop bin with a hose. Their machines swallow dust, debris and standing water with the kind of reliability that makes them garage staples."),
  ],
  body: [
    P("The 5-gallon models are the sweet spot for home workshops: enough volume for real work, filters that switch between dry and wet duty, and attachments that turn the unit into a blower or a car-detailing tool."),
    P("Honest framing: a shop vac is a tool, not a daily house vacuum — but if you own a garage, it earns its space fast."),
  ],
  products: ["shopvac-5-gallon"],
  updated: "2025-06-01",
},
{
  slug: "ryobi",
  name: "Ryobi",
  short: "The DIY-power-tool brand with a cordless wet/dry freeing you from the socket.",
  intro: [
    P("Ryobi is a DIY and home-improvement staple — known for an enormous battery-sharing ecosystem (ONE+) and, increasingly, yard and power tools that ride the same packs. Its cordless wet/dry vacuum rides exactly that ecosystem."),
  ],
  body: [
    P("The 18V wet/dry brings shop-vac capability to the places a cord won't reach — car detailing mobile, upstairs, outdoors — while sharing the battery you already own. The honest trade-off is lower capacity and runtime versus a corded bin."),
    P("For cordless-ecosystem owners, the Ryobi shop vac is the natural add-on; for one-time garage duty, a corded unit may suit better."),
  ],
  products: ["ryobi-18v-wetdry", "ryobi-pressure-washer"],
  updated: "2025-06-01",
},
{
  slug: "sun-joe",
  name: "Sun Joe",
  short: "Value-first electric pressure washers and outdoor cleaning for the average home.",
  intro: [
    P("Sun Joe sits at the value end of outdooor power: electric pressure washers and outdoor tools that deliver the common jobs — patio, fence, car, driveway — at a fraction of the pro-gear price."),
  ],
  body: [
    P("The SPX series balances PSI and GPM for typical suburban work, with detergent tanks, adjustable nozzles and compact rolling frames. It's the honest pick for homeowners who'll use a pressure washer a dozen times a year."),
    P("Trade-offs versus premium brands: plastic-bodied components and a no-frills fit that rewards light-to-moderate duty over years of intense use."),
  ],
  products: ["sun-joe-spx3000"],
  updated: "2025-06-01",
},
{
  slug: "rugdoctor",
  name: "Rug Doctor",
  short: "Rental-fleet heritage in carpet extraction — pro-style cleaning for homes.",
  intro: [
    P("Rug Doctor is famous for the self-serve carpet cleaning machines at grocery stores — and that same pro-style extraction technology is sold for home use. The brand's pitch is rental-grade power without the rental counter."),
  ],
  body: [
    P("Home Rug Doctor machines lean toward full-size carpet extraction with hot water and strong suction — the whole-room answer for carpets between professional visits."),
    P("They're a serious machine for the carpet-heavy home that wants rental-grade results on its own schedule."),
  ],
  products: ["rugdoctor-pro-deep"],
  updated: "2025-06-01",
},
{
  slug: "mr-clean",
  name: "Mr. Clean",
  short: "The magic eraser brand — water-activated melamine foam for scuffs and marks.",
  intro: [
    P("Mr. Clean is the household name that turned melamine foam into an everyday cleaning tool. The Magic Eraser's water-activated gentle abrasion lifts scuffs, kick marks and light stains from hard surfaces without added chemistry — among the most famous cleaning products in the world."),
  ],
  body: [
    P("The Eraser's magic is mechanical: wet the foam, blot the mark off, respect the finish. Multi-packs are cheap and genuinely versatile across walls, doors, baseboards and appliances."),
    P("The honest caveat is surface safety — as an abrasive it warrants a spot test and light pressure on glossy or coated finishes."),
  ],
  products: ["mr-clean-magic-eraser"],
  updated: "2025-07-14",
},
{
  slug: "bona",
  name: "Bona",
  short: "Turning hardwood care from bucket mopping into a spray-on system.",
  intro: [
    P("Bona built its name on hardwood care — the cleaner brand that taught households to treat finished wood and sealed floors with a directed spray. Its spray mop brings that system into the daily-routine category many households now use."),
  ],
  body: [
    P("The Premium Spray Mop's appeal is the no-bucket daily loop: cleaner sprayed onto the floor, a washable microfiber pad gliding it clean, protecting fine wood from the over-wetting bucket mops risk."),
    P("It's a maintenance-first brand with a cleaning-science heritage; the honest limitation is that fine wood still needs a proper deep-wet pass on occasion. For day-to-day sheen, few do it better."),
  ],
  products: ["bona-premium-spray-mop"],
  updated: "2025-07-14",
},
{
  slug: "oxo",
  name: "OXO Good Grips",
  short: "Ergonomics-first household tools, including the corner-swept broom set.",
  intro: [
    P("OXO Good Grips is the design-first brand that made kitchen utensils comfortable, and the same ergonomics philosophy carries into cleaning. Its corner-swept broom-and-dustpan set is the finishing answer for indoor sweeping."),
  ],
  body: [
    P("The broom's corner-swept bristle shape reaches walls and edges, its dustpan spring hinge sits flush to the floor, and every handle is a soft-grip exercise in comfort. Durable synthetic bristles are built to last."),
    P("The honest limits are those of any broom: it's indoor-first and manual. As an everyday sweep-up companion, though, ergonomics and design earn the price."),
  ],
  products: ["oxo-good-grips-broom"],
  updated: "2025-07-14",
},
{
  slug: "natures-miracle",
  name: "Nature's Miracle",
  short: "The enzyme-cleaner classic for pet accidents — a pet-home staple.",
  intro: [
    P("Nature's Miracle is the name most pet owners meet first: the enzyme formula that actually digests urine and accident residue instead of just covering the smell. It's a household classic because it works on the chemistry the problem is made of."),
  ],
  body: [
    P("Enzyme cleaners need access and time — Nature's Miracle's trigger bottles make it the easiest way into the correct saturation-and-dwell technique that pet owners eventually learn."),
    P("Across accidents, age of stain and surface, it's the reliable fresh-accident answer; old set-in marks may call for repeated passes or a stronger specialist."),
  ],
  products: ["natures-miracle"],
  updated: "2025-06-01",
},
{
  slug: "rocco-and-roxie",
  name: "Rocco & Roxie",
  short: "Professional-strength enzyme cleaner for the oldest, mustiest pet stains.",
  intro: [
    P("Rocco & Roxie is the professional-strength entry in the enzyme pet-cleaner space — the brand you upgrade to when a classic just isn't getting the months-old stain out."),
  ],
  body: [
    P("Its concentrated enzyme formula is aimed at set-in residue, musty carpets and the stains that have been baked in by time or a dryer. Users treat it as the nuclear option for pet smells."),
    P("It costs more per ounce, and the honest trade-off applies: professional strength means careful measurement and patience for the enzymes to work."),
  ],
  products: ["rocco-roxie"],
  updated: "2025-06-01",
},
{
  slug: "folex",
  name: "Folex",
  short: "The no-rinse instant carpet spot remover beloved by professional cleaners.",
  intro: [
    P("Folex is a quiet professional's secret that went mainstream: an instant, no-rinse spot remover that lifts carpet and upholstery marks without scrubbing-bubbles residue. It's one of the single-purpose products that earns its specialist place."),
  ],
  body: [
    P("Folex works fast on fresh-to-recent spots — no rinse, minimal residue, colour-safe on most fabrics. It's the first item thousands of cleaners recommend for an everyday carpet stain."),
    P("Honest limits: it's a fabric specialist, not a pet-enzyme digester and not a deep extractor substitute."),
  ],
  products: ["folex-instant-carpet-spot"],
  updated: "2025-06-01",
},
{
  slug: "force-of-nature",
  name: "Force of Nature",
  short: "Electrolyzed-water disinfecting system — cleaning chemistry from salt, water and vinegar.",
  intro: [
    P("Force of Nature sells the promise of generating your own cleaner chemistry: a small electrolysis machine from salt, water and vinegar makes a disinfectant with proven efficacy, so households stop buying single-use spray bottles."),
  ],
  body: [
    P("The system's pitch is honest: the electrolyzed water it makes is a genuinely tested disinfectant, and the plastic footprint per clean drops to nearly nothing. The counter-cost is the machine, pods and the daily habit."),
    P("We cover it as the genuine eco-contender: the chemistry works, but success depends on technique and readiness to refill, not just the brand."),
  ],
  products: ["force-of-nature"],
  updated: "2025-06-01",
},
{
  slug: "swiffer",
  name: "Swiffer",
  short: "The pad-based sweeper and duster system that made disposable cleaning mainstream.",
  intro: [
    P("Swiffer essentially invented (and owns) the pad-swap floor and dusting category: sweep with a dry cloth, mop with a wet pad, dust shelves with a duster, and throw the pad away. It's convenience-first cleaning baked into the design."),
  ],
  body: [
    P("The convertible sweeper is the key Swiffer we test: pad-based floor cleaning that grabs dust without a bucket, and the wet-pad option for a quick mopping pass. Its entire appeal is that there's no rinse-and-reuse ritual at all."),
    P("Honest trade-off: pad refills are a recurring cost and a plastic footprint, which pits convenience against the eco-friendly clusters we also cover."),
  ],
  products: ["swiffer-sweeper", "swiffer-duster"],
  updated: "2025-06-01",
},
{
  slug: "chom-chom",
  name: "ChomChom",
  short: "The reusable roller that made sticky pet-hair removal obsolete.",
  intro: [
    P("ChomChom built its name on one design idea: a reusable rubber roller with a built-in collecting base that lifts pet hair from fabric without the endless rebuy of sticky sheets. It is the modern household answer to pet fur on sofas and car seats."),
  ],
  body: [
    P("The roller's appeal is the removal of recurring cost and waste — rubber stays effective much longer than adhesive, and the base makes the collected mess easy to dispose of."),
    P("In the pet furniture space it is the clear brand-first product: no batteries, simple mechanics, and immediate results on fabric. Its honest limits: it's not a vacuum, and carpet still benefits from a bristle tool or vacuum."),
  ],
  products: ["chom-chom-roller"],
  updated: "2025-07-14",
},
{
  slug: "angry-orange",
  name: "Angry Orange",
  short: "Citrus-based, bargain-per-use pet odour and stain eliminator.",
  intro: [
    P("Angry Orange turned the pet-odour category toward citrus: a concentrated neutraliser and spot stain remover whose fresh orange scent became its calling card. It is the value leader for homes that dislike synthetic perfume."),
  ],
  body: [
    P("Its role in a pet home is daily smell control: dilute, spray, and deodorise litter and furniture odours — with spot-stain duty in the same bottle. The economics are among the best per-use in its category."),
    P("The honest caveat stands: citrus neutralisation is not enzyme digestion, so actual urine residue still benefits from an enzyme pass. But for the general smell that plagues every pet household, it's a deserved bestseller."),
  ],
  products: ["angry-orange"],
  updated: "2025-07-14",
},
{
  slug: "simple-solution",
  name: "Simple Solution",
  short: "The budget enzyme cleaner that digs into carpet pile with a built-in scoop.",
  intro: [
    P("Simple Solution is the affordable entry into enzyme pet cleaning: a genuine enzyme stain and odour remover with a built-in scoop spear for reaching into carpet pile. It is often the first enzyme brand new pet owners meet."),
  ],
  body: [
    P("Its honesty lies in doing the formula basics right at a price point that leaves budget headroom: real digesting enzymes, wide surface range, and a tool that parts fibres so the chemistry reaches beneath the visible mark."),
    P("Where it yields is strength: months-old set-in stains may call for a professional-grade enzyme sibling. For everyday accidents, its value is unmatched."),
  ],
  products: ["simple-solution-stain-and-odor"],
  updated: "2025-07-14",
},
{
  slug: "weiman",
  name: "Weiman",
  short: "Appliance-care specialist behind oven sprays, cooktop kits and stainless wipes.",
  intro: [
    P("Weiman is a US appliance-care specialist whose cooktop and oven cleaners, stainless-steel wipes and surface-care kits occupy a steady spot in the kitchen drawer. Its honest positioning is targeted chemistry: a dedicated product for glass cooktops, a heavy-duty spray for oven interiors, and at-home care lines that mirror the products professional surface-care suppliers carry."),
  ],
  body: [
    P("Weiman's reputation rests on task-specific formulas rather than one hero product. The glass cooktop kit — cleaner plus a purpose-made pad — is the classic example: it applies the pad-and-polish technique that keeps smooth-top ranges streak-free without the scratching risks of kitchen abrasives."),
    P("Its heavy-duty oven cleaner targets the spray-and-wait deep clean, while the stainless products cover the everyday wipe-down. Across the range, the guidance is consistent: match the chemistry to the surface, and follow safety steps on strong formulas."),
  ],
  products: ["weiman-stainless-wipes", "weiman-heavy-duty-oven-cleaner", "weiman-glass-cooktop-cleaner-kit", "weiman-furniture-polish"],
  updated: "2025-06-01",
},
{
  slug: "easy-off",
  name: "Easy-Off",
  short: "The unlikely legend of oven cleaning — famous for fume-free formulas.",
  intro: [
    P("Easy-Off is the brand name most people think of first for oven cleaning — the spray, wipe-wait-and-wipe routine that turned a dreaded chore into a doable one. Its fume-free line modernised the famous formula for homes (and apartments) where a wall of chemical smell is the real obstacle."),
  ],
  body: [
    P("The cleaning logic is spray-and-wait chemistry: coat the soiled interior, let the product dwell, then wipe. The fume-free positioning trades a little raw aggression for a much more comfortable experience, which is why it is the default for moderately soiled ovens and small kitchens."),
    P("With almost universal recognition and decades of owner feedback to draw on, Easy-Off remains one of the best-documented oven-cleaning purchases on the market."),
  ],
  products: ["easy-off-fume-free-oven-cleaner"],
  updated: "2025-06-01",
},
{
  slug: "glisten",
  name: "Glisten",
  short: "Sink-side cleaning favourite whose dishwasher tablets fix the machine itself.",
  intro: [
    P("Glisten is best known for the sink-side cleaning products attached to its name, and its dishwasher cleaner tablet is the machine-care workhorse of the line. One tablet a month, run through an empty cycle, strips the grease film, limescale and odour build-up that live in the sump, filters and seals."),
  ],
  body: [
    P("The formula targets what a wipe-down can't reach: the machine's own water path, carrying the active chemistry around sump, spray arms and gaskets. That makes it a genuinely preventive maintenance product — the kind that stops a musty dishwasher before it needs a service call."),
    P("For the price of a few doses per year, it addresses the most common dishwasher complaints (smell, film, under-washing) at their chemical root."),
  ],
  products: ["glisten-dishwasher-cleaner", "glisten-washer-cleaner"],
  updated: "2025-06-01",
},
{
  slug: "affresh",
  name: "Affresh",
  short: "The appliance-cleaner brand best known for washing-machine tablets, now covering the dishwasher too.",
  intro: [
    P("Affresh built its name on machine cleaning with the washing-machine tablet that rescues smelly washers — fragrance-free, once-a-month, and famously effective. The same machine-care logic extends to the dishwasher, giving a single trusted brand for the monthly appliance maintenance habit."),
  ],
  body: [
    P("The core promise is one tablet, empty machine, monthly cycle: descaling and odour removal without disassembly. For washing machines it strips soap scum and odour-causing buildup; for dishwashers it targets limescale, grease film and the damp-musty residue that clings to seals and sump."),
    P("Its fragrance-free positioning makes it a natural fit for machines that touch food, dishes and laundered bedding, and its near-legendary status among washer owners gives it an unusual degree of documented trust."),
  ],
  products: ["affresh-washer-cleaner", "affresh-dishwasher-cleaner"],
  updated: "2025-06-01",
},
{
  slug: "finish",
  name: "Finish",
  short: "The dish-detergent giant whose machine cleaner completes the dishwasher routine.",
  intro: [
    P("Finish is the well-known name in automatic dishwashing — the detergents and rinses most kitchens stock. Its machine-care line adds the monthly dishwasher cleaner that strips limescale, grease and soft films from the machine itself, so the whole routine lives on one familiar shelf."),
  ],
  body: [
    P("The cleaner is the maintenance half of the Finish ecosystem: where detergents clean the load, the machine cleaner cleans the sump, filters and spray arms with a once-a-month empty cycle."),
    P("For households already buying Finish detergent, adding the machine cleaner is the smallest possible step-change in the maintenance habit — same brand, same scheduling, zero research required."),
  ],
  products: ["finish-max-in-3-dishwasher-cleaner"],
  updated: "2025-06-01",
},
{
  slug: "ecover",
  name: "Ecover",
  short: "The plant-based cleaning brand that made green formulas mainstream, from dish soap to multi-surface spray.",
  intro: [
    P("Ecover is one of the first names in plant-based cleaning — a European brand that built its reputation on biodegradable formulas and wild, ethical branding before 'eco' was a checkbox. Its dish soaps and multi-surface sprays are the low-effort green swaps most households start with."),
  ],
  body: [
    P("The brand's strength is approachability: Ecover products behave like the conventional bottles you already use, with plant-based chemistry and mild scents. That makes it the default on-ramp for homes easing into green cleaning."),
    P("Honest limits apply as with any green formula: everyday grime and grease, yes; baked-on carbon and stone acids, no. Ecover is a daily-workhorse brand, not a restoration kit."),
  ],
  products: ["ecover-multi-surface", "ecover-dish-soap", "ecover-laundry-liquid"],
  updated: "2025-06-01",
},
{
  slug: "biokleen",
  name: "Biokleen",
  short: "The long-running concentrate specialist for low-cost, fragrance-free cleaning.",
  intro: [
    P("Biokleen has quietly sold concentrated, plant-based cleaning for decades — before green cleaning was trendy, its all-purpose concentrate was already the budget route to fewer bottles."),
  ],
  body: [
    P("The appeal is practical: one concentrated bottle, diluted at home, with fragrance-free and dye-free formulas that suit sensitive households. Per-use cost is among the lowest in the category."),
    P("The honest trade: dilution asks a little discipline — get the ratio right and you save money and plastic; get it wrong and you waste either product or elbow grease."),
  ],
  products: ["biokleen-all-purpose"],
  updated: "2025-06-01",
},
{
  slug: "grove-collaborative",
  name: "Grove Collaborative",
  short: "The refill-first home-care brand built around transparent sourcing and less plastic.",
  intro: [
    P("Grove Collaborative built a subscription home-care brand around one idea: refill instead of repurchase. Its dish soaps and cleaning line pair plant-based formulas with durable bottles and small refill packs."),
  ],
  body: [
    P("The differentiator is transparency — ingredient and sourcing claims are front and centre, which removes the guesswork from choosing a green product."),
    P("The caveat of the model: you buy into the refill habit, and refill packs still ship from a warehouse, so the plastic win is lower across the subscription, not zero."),
  ],
  products: ["grove-dish-soap", "grove-multi-surface-refill"],
  updated: "2025-06-01",
},
{
  slug: "dropps",
  name: "Dropps",
  short: "Minimal-plastic, plant-based dishwasher (and laundry) pods with a subscription model.",
  intro: [
    P("Dropps sells concentrated, plant-based laundry and dishwasher pods with a minimal-plastic pitch — fewer pods per box, plastic-neutral shipping, and a subscription that removes repurchase friction."),
  ],
  body: [
    P("Its dishwasher pods clean like mainstream ones while carrying a lighter plastic story, and pricing per load stays competitive — the sweet spot most eco homes look for in a swap."),
    P("The model's catch is commitment: the best pricing comes via subscription, so it suits households that have adopted a stable detergent routine."),
  ],
  products: ["dropps-dishwasher-pods", "dropps-laundry-pods"],
  updated: "2025-06-01",
},
{
  slug: "blueland",
  name: "Blueland",
  short: "The plastic-free tablet system — reusable sleeves and dry tablets for dishwashing and cleaning.",
  intro: [
    P("Blueland made its name removing plastic from the detergent format itself: dry, plastic-free tablets for dishwashing and cleaning, shipped in slim envelopes and held in reusable sleeves."),
  ],
  body: [
    P("The design is the statement: you keep a steel sleeve, drop one tablet in per load, and the liquid-waste and plastic-tub problems both disappear."),
    P("The trade is format commitment — you hold onto the sleeve and order refills — but for households that want plastic genuinely out of the dish routine, it's the clearest answer."),
  ],
  products: ["blueland-dish-tablets", "blueland-multi-surface"],
  updated: "2025-07-14",
},
{
  slug: "mrs-meyers",
  name: "Mrs. Meyer's",
  short: "Plant-based cleaners in garden scents — the friendly gateway into green cleaning.",
  intro: [
    P("Mrs. Meyer's Clean Day made plant-based cleaning feel normal: garden-scented formulas built around essential oils, sold everywhere and priced against the mainstream shelf. It's the brand that turned 'eco' from worthy into everyday."),
  ],
  body: [
    P("Its Multi-Surface Everyday Cleaner is the gateway product — a plant-based spray that cuts daily grime on counters, tables and appliances with a scent line that lifts the room."),
    P("The honest note is scope: it cleans everyday mess gracefully but baked-on heavy mess still wants a specialist. For the daily drift, it's as pleasant and effective as cleaning gets."),
  ],
  products: ["mrs-meyers-multi-surface"],
  updated: "2025-07-14",
},
{
  slug: "method",
  name: "Method",
  short: "The design-forward plant-based cleaning brand that made green the good-looking everyday choice.",
  intro: [
    P("Method built plant-based cleaning with an eye for the bottle — design-forward packaging and recognisable ingredients that made 'eco' feel like the upgrade, not the compromise. Its daily shower spray is the brand's bathroom calling card."),
  ],
  body: [
    P("Method's position is credibility through normalcy: formulas that clean like the mainstream with plant-based, plant-derived chemistry and more pleasant scents. It wins by making the green choice the easy one."),
    P("The honest note: it's everyday chemistry, not a restoration category — Method cleans grime so restoration rarely needs to happen."),
  ],
  products: ["method-daily-shower"],
  updated: "2025-06-01",
},
{
  slug: "kaboom",
  name: "Kaboom",
  short: "The foaming bathroom formula that made cling-time the point.",
  intro: [
    P("Kaboom built its name on one mechanic done right: chemistry that foams, clings to vertical surfaces and rinses clean. In the bathroom that means shower walls, tubs and tile that get cleaned as one pass."),
  ],
  body: [
    P("The brand's foam shower, tub and tile cleaner is the weekly workhorse — foam cling keeps the product working where sprays run off, cutting soap scum without the marathon scrub."),
    P("Honest limits: it cuts everyday grime, while established mold and heavy scale still call for a specialist — Kaboom cleans, it doesn't rescue."),
  ],
  products: ["kaboom-shower-tub-tile"],
  updated: "2025-06-01",
},
{
  slug: "clr",
  name: "CLR",
  short: "The default brand for dissolving calcium, lime and rust — descaling made into a household name.",
  intro: [
    P("CLR turned the descaling category into a household name: a single product whose name IS its job — calcium, lime and rust. No pretense, just the honest chemistry that dissolves deposits."),
  ],
  body: [
    P("The formula's appeal is breadth: pour, spray or soak across metal, ceramic and glass, restoring showerheads, faucets, kettles and drains. Where general cleaners polish around a deposit, CLR removes it."),
    P("The price of that power is care: acid chemistry off-limits on natural stone and aluminium, with gloves, ventilation and a thorough rinse always."),
  ],
  products: ["clr-calcium-lime-rust"],
  updated: "2025-06-01",
},
{
  slug: "lime-a-way",
  name: "Lime-A-Way",
  short: "The bathroom-tuned limescale spray for film, chrome and glass.",
  intro: [
    P("Lime-A-Way is the descaling niche's bathroom specialist: a spray purpose-built for dissolving hard-water film and soap scum from shower glass, chrome, porcelain and tile."),
  ],
  body: [
    P("Its tuning is the point — where multi-surface descalers spread across the house, Lime-A-Way meets the specific film-and-scum mix a bathroom produces, restoring shine in minutes."),
    P("The trade is scope: it's not the product for serious rust or whole-appliance scale, and like all acid chemistry, natural stone stays off the menu."),
  ],
  products: ["lime-a-way"],
  updated: "2025-06-01",
},
{
  slug: "better-life",
  name: "Better Life",
  short: "Plant-based, bleach-free bathroom and kitchen cleaners for low-fume, low-tox everyday cleaning.",
  intro: [
    P("Better Life builds plant-based cleaning around what most households actually want: formulas free of bleach, dyes and harsh fragrance that you don't dread in a small steamy room."),
  ],
  body: [
    P("Its bathroom cleaner is the everyday pick — it cuts soap scum and grime while staying gentle enough for frequent use, with a low-fume profile that spares sensitive noses."),
    P("The credible claim is honesty: plant-based chemistry cleans; established mold and hard-water scale still call for specialists."),
  ],
  products: ["better-life-bathroom"],
  updated: "2025-06-01",
},
{
  slug: "zep",
  name: "Zep",
  short: "Professional-flavoured cleaning chemistry for the jobs consumers won't solve.",
  intro: [
    P("Zep is the professional-flavoured brand that crossed from commercial cleaning into the home aisle — heavier chemistry than everyday sprays, built for results on stubborn grime."),
  ],
  body: [
    P("Its Grout & Tile Cleaner is the before-and-after product for stained, neglected grout lines and bathroom floors — the restore that routine surface cleaners can't achieve."),
    P("The honest note is handling: Zep's strength wants ventilation, gloves and a spot test, and sealing after the restore is the half of the job that keeps it clean."),
  ],
  products: ["zep-grout-cleaner"],
  updated: "2025-07-14",
},
{
  slug: "soft-scrub",
  name: "Soft Scrub",
  short: "The mild-abrasive cleanser classic — gentle scrubbing for tubs and tile.",
  intro: [
    P("Soft Scrub built a category on a single insight: some bathroom soil needs mild abrasion, not more liquid. Its fine-grit gel lifts soap scum and stains from tubs and tile without scratching most surfaces."),
  ],
  body: [
    P("It's the weekly tub-and-tile workhorse — the middle step between a daily spray and a heavy cylinder. With oxygen-bleach variants, it handles stain duty too."),
    P("The honest limit is that no abrasive is universal: polished and soft finishes deserve a spot test, and deeply stained grout wants the dedicated grout cleaner."),
  ],
  products: ["soft-scrub"],
  updated: "2025-07-14",
},
{
  slug: "lysol",
  name: "Lysol",
  short: "The disinfecting-clean mainstream with medical credibility behind it.",
  intro: [
    P("Lysol is the household name that made disinfecting part of normal cleaning, and its toilet bowl cleaner carries that medical credibility into the weekly deep clean."),
  ],
  body: [
    P("Its thick bowl formula clings to the porcelain while it works — handling rings, stains and brush residue while doubling as a disinfecting pass."),
    P("The honest caveat is routine: no cleaner beats the weekly scrub-and-sit cadence, and bleach formulas want ventilation, whichever bowl product you choose."),
  ],
  products: ["lysol-toilet-bowl-cleaner"],
  updated: "2025-07-14",
},
{
  slug: "drano",
  name: "Drano",
  short: "The category-defining drain cleaner — thick gel that clears slow pipes.",
  intro: [
    P("Drano is the drain-cleaner brand that defined the category — thick gel formulas that pour through standing water and dissolve the hair-and-soap clogs that slow bathroom drains."),
  ],
  body: [
    P("Its Max Gel is the classic Saturday fix: it sinks through standing water, clings to the clog and dissolves the build-up without backing up the pipe."),
    P("The honest advice built into its trust is method: plunge first, treat second, and treat only occasional slow drains — weekly use points to a physical clog or a plumber."),
  ],
  products: ["drano-max-gel"],
  updated: "2025-07-14",
},
{
  slug: "liquid-plumr",
  name: "Liquid-Plumr",
  short: "Clorox's drain cleaner — bleach-powered clearing with trap freshness.",
  intro: [
    P("Liquid-Plumr is Clorox's answer on the drain-cleaner shelf: bleach-powered liquid plus gel delivery that clears organic clogs and freshens the trap along the way."),
  ],
  body: [
    P("It handles the routine slow drain and leaves a fresher trap, which is the small differentiator households notice in the kitchen."),
    P("It shares the chemistry honesty of the category — plunge first, never mix products, follow contact times, and call it in when drains are chronic."),
  ],
  products: ["liquid-plumr"],
  updated: "2025-07-14",
},
{
  slug: "gain",
  name: "Gain",
  short: "The scent-first P&G laundry brand that made fragrance a feature, not a by-product.",
  intro: [
    P("Gain is P&G's scent-led laundry brand: a detergent that puts fragrance engineering first, with the same enzyme-based cleaning tech as Tide sharing the same family. The signature smell isn't a side effect — it's the product."),
  ],
  body: [
    P("Behind the scent is real technology: enzyme-based stain fighting and an HE-safe liquid that holds its own against the premium jugs in the aisle. What separates Gain is persistence — the fragrance is engineered to survive the wash and stay on fabric."),
    P("We cover Gain with the same scrutiny as any detergent: scent is a beloved feature for many and a dealbreaker for sensitive households, and both truths are worth stating plainly."),
  ],
  products: ["gain-laundry-detergent"],
  updated: "2025-07-14",
},
{
  slug: "arm-and-hammer",
  name: "Arm & Hammer",
  short: "The baking-soda household brand whose value detergents keep clothes fresh on a budget.",
  intro: [
    P("Arm & Hammer spans the whole household-cleaning shelf on the strength of one ingredient story: baking soda. In laundry, that translates to detergents that keep clothes fresh and fight everyday stains at a value price that made the brand a thrifty-family staple."),
  ],
  body: [
    P("The detergent line carries the brand's deodorising heritage into the wash — fresh-feeling loads at a cost per load among the cheapest in the aisle, which is why the jug endures."),
    P("We cover Arm & Hammer honestly: value-leading daily cleaning with a mild scent, not a set-stain specialist — know what it is and it'll never disappoint."),
  ],
  products: ["arm-and-hammer-clean-burst"],
  updated: "2025-07-14",
},
{
  slug: "bounce",
  name: "Bounce",
  short: "The dryer-sheet brand that turned static control into a zero-measure fresh-scent ritual.",
  intro: [
    P("Bounce is the dryer sheet from P&G's fabric-care family: toss one into a cycle and it reduces static, softens the load and leaves a fresh-scent finish on sheets and towels straight out of the dryer."),
  ],
  body: [
    P("The format is the engine — a measured, mess-free sheet that does the whole dryer's fabric-care job in one toss. Across the line, scents range from classic to floral, keeping it a permanent feature of the laundry aisle."),
    P("Its convenience has a real cost, reflected honestly: single-use, and over-use can coat towels with a light film that affects absorbency. Per-label use keeps the ritual effective."),
  ],
  products: ["bounce-dryer-sheets"],
  updated: "2025-07-14",
},
{
  slug: "seventh-generation",
  name: "Seventh Generation",
  short: "The plant-based cleaning and laundry brand built on credible green labelling and sensitive-skin formulas.",
  intro: [
    P("Seventh Generation built its name on believable green chemistry: plant-based, plant-derived ingredients with transparent labelling, including the Free & Clear laundry line that made dye-free and fragrance-free a mainstream comfort rather than a niche compromise."),
  ],
  body: [
    P("Beyond laundry, the brand's disinfecting wipes and sprays carry its plant-based positioning into everyday surface cleaning — one ingredient philosophy across the home."),
    P("The strength is credibility: genuinely plant-based formulas with a beer-scent-free, dye-free story, at a slight premium that households pay for formula and trust."),
  ],
  products: ["seventh-generation-free-clear", "seventh-generation-disinfecting", "seventh-generation-dish-liquid"],
  updated: "2025-06-01",
},
{
  slug: "shout",
  name: "Shout",
  short: "The stain-pretreat brand whose gel and advanced formulas take on the marks a spray leaves behind.",
  intro: [
    P("Shout's identity is stain pretreating, and its Advanced gel forms give it a modern edge: chemistry that clings to set-in marks instead of dripping off."),
  ],
  body: [
    P("Shout Advanced targets the stains that defeat a plain spray, holding a concentrated gel on collars, grime and textured fabric as the pre-wash step. It positions as the serious alternative to OxiClean in the pretreat aisle."),
    P("Treated honestly like any pretreat product: it needs dwell and agitation to shine."),
  ],
  products: ["shout-advanced"],
  updated: "2025-06-01",
},
{
  slug: "windex",
  name: "Windex",
  short: "The iconic blue glass cleaner that made streak-free windows a household norm.",
  intro: [
    P("Windex is the glass cleaner that names the category — the blue bottle is shorthand for cleaning glass, with a streak-free reputation built over decades and universal availability."),
  ],
  body: [
    P("Its ammonia-based heritage gives it the cut for fingerprints and smudges on windows, mirrors and tabletops, in a familiar spray-wipe ritual most homes absorb instantly."),
    P("The honest note: it's the everyday glass default, while very heavy or residue-sensitive work calls for specialist formulas within the glass aisle."),
  ],
  products: ["windex-original"],
  updated: "2025-06-01",
},
{
  slug: "sprayway",
  name: "Sprayway",
  short: "The ammonia-free foam glass cleaner beloved by detailers and window-phobes alike.",
  intro: [
    P("Sprayway built a devoted following on one mechanic: fine aerosol foam that clings to vertical glass, wipes off streak-free and dries fast — with no ammonia."),
  ],
  body: [
    P("The foam cling is the reason it wins panes and mirrors over run-prone sprays, and its ammonia-free formula keeps it comfortable in small rooms and around households that avoid ammonia."),
    P("It also covers stainless and chrome per label, making it a useful multi-surface edge tool in the bathroom and kitchen."),
  ],
  products: ["sprayway-glass-cleaner"],
  updated: "2025-06-01",
},
{
  slug: "stoner",
  name: "Stoner",
  short: "The residue-free detailing brand whose Invisible Glass leaves glass looking absent.",
  intro: [
    P("Stoner comes out of the detailing world, and its Invisible Glass cleaner targets what detailers hate most: film and haze left on glass after a 'clean'."),
  ],
  body: [
    P("Ammonia-free and dye-free, it finishes auto glass, mirrors and interior windows residue-free, earning a reputation among detailers and aviation enthusiasts for clarity."),
    P("The premium position is justified for streak-sensitive surfaces, though heavy residue wants a two-step approach."),
  ],
  products: ["invisible-glass"],
  updated: "2025-06-01",
},
{
  slug: "pledge",
  name: "Pledge",
  short: "The aerosol furniture polish that dusts, shines and protects finished wood in one pass.",
  intro: [
    P("Pledge is the can households picture for wood care — a lemon-scented aerosol that dusts and shines finished tables and cabinets in a single spray-and-wipe."),
  ],
  body: [
    P("Its one-pass logic suits busy homes: a dusting becomes a shine in seconds, with the protection a quick polish adds to sealed finishes."),
    P("Honestly, it maintains — very dry or antique wood responds to a conditioning oil, which is where the polish's limits end."),
  ],
  products: ["pledge-lemon-polish"],
  updated: "2025-06-01",
},
{
  slug: "old-english",
  name: "Old English",
  short: "The lemon-oil conditioning classic that feeds dry wood and restores antique lustre.",
  intro: [
    P("Old English is the conditioning side of wood care: a lemon oil that penetrates dry grain, deepens colour and revives water-marked and antique pieces."),
  ],
  body: [
    P("Where aerosols gloss over a surface, oil works into it — feeding the wood rather than coating it, which is why the brand endures with legacy furniture owners."),
    P("The trade is time: oil needs working in and a lingering lemon scent, and it's not a quick-sheen product."),
  ],
  products: ["old-english-lemon-oil"],
  updated: "2025-06-01",
},
{
  slug: "resolve",
  name: "Resolve",
  short: "The household carpet-spot staple — foaming remover for coffee, food and mystery marks.",
  intro: [
    P("Resolve is the name most homes reach for when a carpet spot appears: a foaming trigger spray that attacks coffee, food and mystery marks on carpet and upholstery."),
  ],
  body: [
    P("Its foaming action lifts and wicks stains out of the pile rather than grinding them deeper, which is the mechanic behind its early-attack reputation. It's the everyday first move before a professional spotter is called."),
    P("Set-in or old marks are where its honesty begins: spot sprays lift what they can, and months-set stains still want an enzyme formula or the pro's water-based spotter."),
  ],
  products: ["resolve-carpet-spot"],
  updated: "2025-07-14",
},
{
  slug: "scrubbing-bubbles",
  name: "Scrubbing Bubbles",
  short: "SC Johnson's bathroom line — foaming scrubbing power and no-scrub daily upkeep.",
  intro: [
    P("Scrubbing Bubbles is the bathroom-focused branch of SC Johnson: foaming bathroom cleaner as the classic, plus daily no-scrub sprays and toilet gels that keep the routine honest between deep cleans."),
  ],
  body: [
    P("The line spans the two bathroom philosophies: the foaming spray-and-scrub classic for weekly work, and the daily-post-shower sprays that prevent scum building rather than rescuing it."),
    P("It's hygiene-first chemistry with a light scent — effective, widely available, and best paired with ventilation as with any bathroom cleaner."),
  ],
  products: ["scrubbing-bubbles-bathroom-grinder", "scrubbing-bubbles-daily-shower", "scrubbing-bubbles-toilet-gel"],
  updated: "2025-07-14",
}
];
