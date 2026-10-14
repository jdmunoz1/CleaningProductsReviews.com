import type { Category } from "./types";
export const categories: Record<string, Category> = {
machines: {
    slug: "machines",
    name: "Cleaning Machines",
    short:
      "Vacuums, carpet cleaners, steam mops, pressure washers and floor machines — reviewed and compared.",
    description:
      "Big or small, powered cleaning machines are the heart of a fast, thorough home routine. In this cluster we cover vacuums (upright, canister, cordless, robot, handheld and wet/dry), carpet cleaners and extractors, spot cleaners, steam cleaners and steam mops, floor scrubbers, pressure washers and window-cleaning machines. Every machine reviewed here is chosen for a specific job and surface — the right tool, honestly assessed.",
    metaDescription:
      "Independent reviews and comparisons of vacuums, carpet cleaners, steam mops, pressure washers and floor machines. Find the cleaning machine that actually works.",
    children: [
      "vacuums",
      "robot-vacuums",
      "cordless-vacuums",
      "carpet-cleaners",
      "spot-cleaners",
      "steam-mops",
      "wetdry-vacuums",
      "pressure-washers",
    ],
    best: [
      "best-robot-vacuums",
      "best-cordless-vacuums",
      "best-carpet-cleaners",
      "best-steam-mops",
      "best-vacuum-for-pet-hair",
      "best-pressure-washers",
      "best-wet-dry-vacuums",
    ],
    guides: [
      "how-to-choose-a-vacuum",
      "how-often-should-carpets-be-cleaned",
      "how-to-maintain-a-robot-vacuum",
      "how-to-deep-clean-carpet",
      "steam-mop-vs-traditional-mop",
    ],
    comparisons: ["robot-vs-cordless"],
    featuredProducts: [
      "dyson-v15-detect",
      "shark-stratos",
      "roborock-q-revo",
      "karcher-k5",
      "bissell-cleanview",
    ],
    hubIntro: [
      "The right machine removes the need for harsh chemicals and repeated manual scrubbing.",
      "We break each machine type into buyer sets — homes with pets, allergies, hard floors, or heavy foot traffic.",
      "Every machine review links to a buying guide and a best-of list, so you compare before you decide.",
    ],
  },
vacuums: {
    slug: "vacuums",
    name: "Vacuums",
    short: "Upright, canister, cordless and robotic vacuums compared in one place.",
    description:
      "Vacuums are the workhorse of any cleaning routine. This hub covers upright, canister, cordless stick, robotic, handheld and wet/dry vacuum types, with research-based reviews of the most popular models on the market. Whether you need a vacuum for pet hair, hardwood floors, stairs or a whole home, start here and narrow the field with our best-of lists and buying guides.",
    metaDescription:
      "Vacuum reviews and comparisons — upright, canister, cordless, robot and handheld. Research-based buying help for pet hair, hardwood and whole-home vacuuming.",
    children: ["robot-vacuums", "cordless-vacuums", "canister-vacuums", "upright-vacuums", "wetdry-vacuums"],
    best: [
      "best-robot-vacuums",
      "best-cordless-vacuums",
      "best-vacuum-for-pet-hair",
      "best-canister-vacuums",
      "best-upright-vacuums",
      "best-handheld-vacuums",
    ],
    guides: [
      "how-to-choose-a-vacuum",
      "how-to-maintain-a-robot-vacuum",
      "how-to-clean-vacuum-filters",
      "how-to-vacuum-pet-hair",
    ],
    comparisons: ["robot-vs-cordless"],
    featuredProducts: ["dyson-v15-detect", "dyson-ball-upright", "shark-stratos", "eureka-whirlwind-canister", "ridgid-5-gal-wetdry", "iroomba-roomba"],
    hubIntro: [
      "Vacuum technology splits into battery-powered convenience and corded reliability.",
      "We judge vacuums on suction, filtration, floor range and ease of maintenance — not marketing claims.",
      "Canisters remain best for hard floors; cordless sticks suit quick multi-surface cleans.",
    ],
  },
"floor-carpet": {
    slug: "floor-carpet",
    name: "Floor & Carpet Cleaning",
    short: "Carpet cleaners, spot machines and pressure washers that renew your floors.",
    description:
      "Floors take the hardest daily abuse in any home, and they show it. This cluster covers the machines and chemistry that restore them: full-size carpet cleaners and extractors for whole-room deep cleans, portable spot cleaners for accidents, steam mops for sealed hard floors, and pressure washers for patios, driveways and grime that laughs at a broom. If it touches your floors, we cover how to choose it and how to use it.",
    metaDescription:
      "Carpet cleaner, spot cleaner, steam mop and pressure washer reviews plus deep-clean guides. Research-based buying help for better floors.",
    children: ["carpet-cleaners", "spot-cleaners", "steam-mops", "pressure-washers", "carpet-stain-removers"],
    best: [
      "best-carpet-cleaners",
      "best-spot-cleaners",
      "best-steam-mops",
      "best-pressure-washers",
      "best-carpet-stain-removers",
    ],
    guides: [
      "how-often-should-carpets-be-cleaned",
      "how-to-deep-clean-carpet",
      "steam-mop-vs-traditional-mop",
      "how-to-choose-a-pressure-washer",
    ],
    comparisons: ["carpet-cleaner-spot-vs-full", "steam-vs-spin-mop"],
    featuredProducts: [
      "bissell-proheat-2x-revolution",
      "bissell-little-green",
      "shark-steam-pocket-s3",
      "karcher-k5",
      "folex-instant-carpet-spot",
      "ryobi-pressure-washer",
    ],
    hubIntro: [
      "A deep clean every season turns a tired carpet back into a fresh one.",
      "Portable extractors handle the accident; full-size machines handle the room.",
      "Steam mops sanitise sealed hard floors without chemicals.",
    ],
  },
kitchen: {
    slug: "kitchen",
    name: "Kitchen Cleaning",
    short: "Degreasers, stainless steel care and the sprays that keep a kitchen cooking clean.",
    description:
      "Kitchens get hit with grease, food and fingerprints daily, so the products here matter more personally than almost anywhere else. This cluster covers the spray-and-wipe degreasers that keep counters and cooktops moving, stainless steel care that stops streaks, and the heavy-hitting powder cleansers that restore sinks and burners. Every recommendation is research-based and chemical-count conscious.",
    metaDescription:
      "Kitchen cleaning product reviews — degreasers, stainless steel cleaners and multi-surface sprays that work. Research-based picks.",
    children: ["kitchen-sprays", "stainless-steel-cleaners", "carpet-stain-removers", "oven-cleaners", "dishwasher-cleaners"],
    best: ["best-kitchen-sprays", "best-stainless-steel-cleaners", "best-carpet-stain-removers", "best-oven-cleaners", "best-dishwasher-cleaners"],
    guides: ["how-to-clean-stainless-steel", "how-to-clean-an-oven", "how-to-clean-a-glass-cooktop", "how-to-clean-a-dishwasher"],
    comparisons: ["dawn-vs-bkf", "weiman-vs-easy-off-oven-cleaners", "glisten-vs-affresh-dishwasher-cleaners"],
    featuredProducts: ["dawn-powerwash", "bar-keepers-friend", "weiman-stainless-wipes", "folex-instant-carpet-spot", "weiman-heavy-duty-oven-cleaner", "glisten-dishwasher-cleaner"],
    hubIntro: [
      "Everyday grease asks for a spray; stubborn build-up asks for a restoration paste.",
      "Stainless steel cleans along the grain — one technique fixes every swirl.",
      "We keep an open mind on harsh chemistry and flag eco alternatives where they genuinely work.",
      "Ovens and cooktops get their own chemistry: spray-and-wait for the interior, pad-and-polish for glass.",
      "A dishwasher cleans dishes, not itself — the monthly tablet does the maintenance you can't reach.",
    ],
  },
bathroom: {
    slug: "bathroom",
    name: "Bathroom Cleaning",
    short: "Shower, toilet and tile products that handle soap scum and hard water.",
    description:
      "Bathrooms are the most concentrated cleaning problem room in the home: soap scum, hard-water scale and grout all gang up on your shower and toilet. This cluster covers the sprays and cleaners that dissolve film, restore porcelain, and keep fixtures looking fresh. We pay particular attention to ingredients and ventilation, because bathroom chemistry sits in a small, steamy space.",
    metaDescription:
      "Bathroom cleaning product reviews — shower cleaners, toilet cleaners and tile care that beat soap scum and hard water.",
    children: ["shower-cleaners", "toilet-cleaners", "bathroom-tile-grout", "limescale-removers", "drain-cleaners"],
    best: ["best-shower-cleaners", "best-toilet-cleaners", "best-tile-grout-cleaners", "best-limescale-removers", "best-drain-cleaners"],
    guides: ["how-to-clean-shower-and-grout", "how-to-remove-hard-water-stains", "how-to-unclog-a-drain"],
    comparisons: ["clr-vs-lime-a-way", "kaboom-vs-tilex", "drano-vs-liquid-plumr"],
    featuredProducts: ["scrubbing-bubbles-bathroom-grinder", "clorox-toilet-bowl", "kaboom-shower-tub-tile", "clr-calcium-lime-rust", "method-daily-shower", "tilex-mold-mildew", "drano-max-gel", "lysol-toilet-bowl-cleaner"],
    hubIntro: [
      "Soap scum is built out of your own soap — regular duty beats heroic one-off rescue.",
      "A bathroom that dries well needs less chemical help than one left wet.",
      "Toilet cleaning is the rare task where the tools matter as much as the chemistry.",
      "Grout and hard-water scale have their own sub-hubs with dedicated picks.",
      "A slow drain is plumbing gunk you can fix on a Saturday — plunge first, gel second.",
    ],
  },
"pet-cleaning": {
    slug: "pet-cleaning",
    name: "Pet Cleaning",
    short: "Enzyme cleaners and stain removal that restore homes shared with animals.",
    description:
      "Living with pets means living with stains and smells that ordinary cleaners cannot touch. Urine and accident residue is organic, and only enzyme chemistry can actually digest it rather than mask it. This cluster covers the enzyme cleaners, spot removers and pet-home vacuums that keep a household fresh without barking at the chemistry. Everything here is chosen with the pet owner's reality in mind.",
    metaDescription:
      "Pet cleaning product reviews — enzyme urine removers, pet-home vacuums and accident cleanup that really works.",
    children: ["pet-urine-removers", "pet-odour-removers", "pet-hair-removal-tools", "carpet-stain-removers"],
    best: ["best-pet-urine-removers", "best-pet-odour-removers", "best-pet-hair-removal-tools", "best-carpet-stain-removers", "best-vacuum-for-pet-hair"],
    guides: ["how-to-remove-pet-urine-smells", "how-to-vacuum-pet-hair", "how-to-remove-pet-hair-from-fabric", "how-to-remove-pet-odours-from-fabric"],
    comparisons: ["natures-miracle-vs-rocco", "chom-chom-vs-furemover"],
    featuredProducts: ["natures-miracle", "rocco-roxie", "folex-instant-carpet-spot", "chom-chom-roller", "angry-orange", "shark-stratos"],
    hubIntro: [
      "Enzyme cleaners digest residue; disinfectants only mask it.",
      "Age of the stain decides which product wins — fresh accidents and set-in marks differ.",
      "A pet-home vacuum is a different machine from a pet-free one; anti-tangle brushrolls matter.",
      "Fabric odour calls for neutralisation; fur calls for rubber; urine calls for enzymes.",
    ],
  },
"eco-friendly": {
    slug: "eco-friendly",
    name: "Eco-Friendly Cleaning",
    short: "Green concentrates, reusable systems and chemical-conscious alternatives that still work.",
    description:
      "Eco-friendly cleaning is a spectrum — from certified concentrates to home electrolysis water systems to simple swaps that reduce single-use chemistry. We cover the popular options honestly: what they cost per use, how they compare to a straightforward spray, and where they fall short. The goal is less environmental guilt and more actual effect.",
    metaDescription:
      "Eco-friendly cleaning product reviews — green concentrates, electrolysis systems and low-waste swaps that genuinely clean.",
    children: ["green-all-purpose-cleaners", "eco-dish-soaps-and-pods", "concentrates-and-refill-systems"],
    best: ["best-eco-friendly-cleaners", "best-microfiber-cloths", "best-brooms", "best-green-all-purpose-cleaners", "best-eco-dish-and-tablets", "best-concentrate-and-refill-cleaners"],
    guides: ["how-to-clean-stainless-steel", "how-to-switch-to-green-cleaning", "how-to-clean-dishes-with-less-plastic", "how-to-use-cleaning-concentrates"],
    comparisons: ["concentrate-vs-on-site-generator", "dropps-vs-blueland", "blueland-vs-grove-multi-surface"],
    featuredProducts: ["force-of-nature", "seventh-generation-disinfecting", "easy-ology-microfiber", "ecover-multi-surface", "ecover-dish-soap", "blueland-dish-tablets", "mrs-meyers-multi-surface", "blueland-multi-surface"],
    hubIntro: [
      "Green cleaning usually means committed cleaning — dwell time and technique close the gap.",
      "Reusable spray systems cut plastic pace better than any single product.",
      "We rank on cleaning and waste together, and we say when green means genuine.",
      "Concentrates and refills now have dedicated sub-hubs with their own picks.",
    ],
  },
"tools-accessories": {
    slug: "tools-accessories",
    name: "Tools & Accessories",
    short: "Mops, brooms, cloths and the small tools that make every clean easier.",
    description:
      "Not every cleaning upgrade has a motor. Some of the biggest wins come from the right mop, a properly cared-for microfiber cloth, or a broom that actually collects. This cluster covers the hand tools and reusable accessories that sit in every cleaning cupboard — judged on durability, ergonomics and the technique their design demands.",
    metaDescription:
      "Cleaning tools and accessories reviews — mops, brooms, microfiber cloths and the hand tools that upgrade every clean.",
    children: ["mops", "brooms", "microfiber-cloths", "dusters", "scouring-pads"],
    best: ["best-mops", "best-brooms", "best-microfiber-cloths", "best-dusters", "best-scouring-pads"],
    guides: ["microfiber-cloth-care", "how-to-remove-scuffs-and-marks", "how-to-sweep-and-choose-a-broom"],
    comparisons: ["steam-vs-spin-mop", "spray-mop-vs-spin-mop", "libman-vs-oxo-brooms"],
    featuredProducts: ["o-cel-o-spin-mop", "swiffer-sweeper", "casabella-broom", "libman-broom", "easy-ology-microfiber", "e-cloth-microfiber", "swiffer-duster", "mr-clean-magic-eraser", "scrub-daddy"],
    hubIntro: [
      "The right tool deletes whole categories of work; the wrong one multiplies it.",
      "Microfiber only stays effective if it's laundered correctly — no fabric softener.",
      "Mop choice follows your floor: spin for wood, steam for sealed hard floors.",
      "Scuffs and baked-on residue are mechanical jobs — the eraser and the scrub pad.",
    ],
  },
laundry: {
    slug: "laundry",
    name: "Laundry Cleaning",
    short: "Detergents, stain removers and washing machine care that keep clothes fresh.",
    description:
      "Laundry is the cleaning chore nobody escapes, and the products are as varied as the washers they go into. This cluster covers HE liquid detergents, the stain removers for the marks that survive a first wash, fabric helpers and boosters, and — critically — the washing machine cleaners that stop the machine itself getting musty. We keep dose and water temperature front of mind, because both determine results more than brand loyalty.",
    metaDescription:
      "Laundry product reviews — HE detergents, stain removers, fabric boosters and washing machine cleaners that really work.",
    children: ["detergents", "stain-removers", "fabric-softeners", "washing-machine-cleaners", "eco-laundry-detergents"],
    best: [
      "best-detergents",
      "best-laundry-stain-removers",
      "best-fabric-softeners-and-boosters",
      "best-washing-machine-cleaners",
      "best-eco-laundry-detergents",
    ],
    guides: ["how-to-clean-a-washing-machine", "how-to-remove-tough-stains"],
    comparisons: ["oxiclean-vs-shout", "affresh-vs-glisten-washer-cleaners", "dropps-vs-ecover", "gain-vs-arm-and-hammer-detergents"],
    featuredProducts: ["tide-hygienic-clean", "persil-proclean", "gain-laundry-detergent", "arm-and-hammer-clean-burst", "oxi-clean-maxforce", "tide-to-go", "downy-unstopables", "downy-rinse-and-refresh", "bounce-dryer-sheets", "affresh-washer-cleaner", "ecover-laundry-liquid", "seventh-generation-free-clear"],
    hubIntro: [
      "The machine you ignore develops the smell your wardrobe then wears — clean it.",
      "Stain surgery happens pre-wash; the second pass is for the immune ones.",
      "Dose by the label, and by your water hardness.",
      "Eco detergents keep the clean while dropping the petrochemicals — see the eco laundry sub-hub.",
    ],
  },
specialist: {
    slug: "specialist",
    name: "Specialist & Niche Cleaning",
    short: "Deep-dive cleaners for the jobs that need something beyond an all-purpose spray.",
    description:
      "Some cleaning problems are rare, stubborn and specialised: a carpet stain a whole year old, a shower grout ring, a toilet ring that ordinary cleaners ignore. This cluster is where the niche products live — the chemical specialists, the targeted formulations, and the unusual-but-honest solutions that the everyday brands don't attempt. When a problem outlasts the general-purpose cupboard, this is where you start.",
    metaDescription:
      "Specialist cleaning product reviews — niche stain, grout and deep-cleaning formulations for problems beyond all-purpose sprays.",
    children: ["carpet-stain-removers", "shower-cleaners", "toilet-cleaners", "kitchen-sprays", "glass-window-cleaners", "wood-and-furniture-polish"],
    best: [
      "best-carpet-stain-removers",
      "best-shower-cleaners",
      "best-toilet-cleaners",
      "best-kitchen-sprays",
      "best-glass-cleaners",
      "best-wood-furniture-polish",
    ],
    guides: ["how-to-remove-pet-urine-smells", "how-to-clean-windows-streak-free"],
    comparisons: ["steam-vs-spin-mop", "windex-vs-sprayway", "pledge-vs-old-english"],
    featuredProducts: ["folex-instant-carpet-spot", "scrubbing-bubbles-bathroom-grinder", "clorox-toilet-bowl", "bar-keepers-friend", "windex-original", "pledge-lemon-polish"],
    hubIntro: [
      "Specialists justify their single-job focus by winning that job outright.",
      "Read the surface restrictions on every niche formula — specialist strength cuts both ways.",
      "When a general spray has failed you twice, it's time for a specialist.",
      "Glass and wood added their own sub-hubs for the streak-and-shine jobs general sprays miss.",
    ],
  },
"robot-vacuums": {
    slug: "robot-vacuums",
    name: "Robot Vacuums",
    short: "Autonomous mains-plus-mop bots that keep floors clean on a schedule.",
    description:
      "Robot vacuums have grown from novelty to genuine daily upkeep. Modern units map your floorplan, self-empty, and some mop too — freeing you from the weekday floor effort entirely. The honest framing: a robot is a maintenance device, not a deep cleaner. This sub-hub covers the popular models, the features that matter (navigation, self-empty, mopping), and the button-down routine that keeps them dependable.",
    metaDescription:
      "Robot vacuum reviews and buying help — mapping, self-emptying, mop bots and the maintenance that keeps yours cleaning.",
    children: [],
    best: ["best-robot-vacuums"],
    guides: ["how-to-maintain-a-robot-vacuum"],
    comparisons: ["robot-vs-cordless"],
    featuredProducts: ["roborock-q-revo", "iroomba-roomba", "eufy-robovac-x8"],
    hubIntro: [
      "A robot keeps the floor from ever looking dirty; that's its job — commercial affection aside.",
      "Mapping and obstacle avoidance separate the usable from the frustrating.",
      "Budget for filters and keep the dock clean, or the robot's floor gets worse.",
    ],
  },
  "cordless-vacuums": {
    slug: "cordless-vacuums",
    name: "Cordless Stick Vacuums",
    short: "Battery-powered sticks that vacuum hard floors, carpet and stairs on one charge.",
    description:
      "Cordless stick vacuums are the default daily machine for most homes now: grab-and-go, no cord, decent to strong suction. They vary enormously — lightweight budget models versus flagships with laser light and live particle counting. This sub-hub stacks the popular models and the honest differences between battery, filtration and brushroll choices.",
    metaDescription:
      "Cordless stick vacuum reviews and comparisons — from budget daily machines to flagship lasers. Research-based buying help.",
    children: [],
    best: ["best-cordless-vacuums"],
    guides: ["how-to-choose-a-vacuum"],
    comparisons: ["dyson-v15-vs-shark-stratos", "dyson-v8-vs-bissell-airram"],
    featuredProducts: ["dyson-v15-detect", "shark-stratos", "dyson-v8-origin", "bissell-airram"],
    hubIntro: [
      "Runtime is a spec, a habit and a promise — battery health decides the reality.",
      "Flagships justify their price with display features and HEPA; value models carry the practical 90%.",
      "Handheld conversion turns a stick into a stair and upholstery tool.",
    ],
  },
"canister-vacuums": {
    slug: "canister-vacuums",
    name: "Canister Vacuums",
    short: "Sealed, powerful machines that glide on hard floors and reach under furniture.",
    description:
      "Canister vacuums keep the motor on the floor while a wand-and-head do the work, which makes them the quiet champions of hard floors, under-furniture cleaning and delicate surfaces. The premium segment (Miele and friends) is legendary for filtration, bagged dust control and longevity. This sub-hub covers the type's strengths, the bag versus bagless debate, and the models worth comparing if your floors lean hard.",
    metaDescription:
      "Canister vacuum reviews and buying help — the glide-and-reach machines that suit hard floors, bags and filtration.",
    children: [],
    best: ["best-canister-vacuums"],
    guides: ["how-to-choose-a-vacuum"],
    comparisons: ["canister-vs-upright", "eureka-whirlwind-vs-miele-complete-c3"],
    featuredProducts: ["miele-complete-c3", "eureka-whirlwind-canister"],
    hubIntro: [
      "Glide and reach are the canister's gifts — hardwood and under-furniture work feel effortless.",
      "Bagged canisters seal dust out of the change; that's the allergy angle.",
      "The wand-and-hose learning curve is short, and the payoff is upstairs carpet technique.",
    ],
  },
  "wetdry-vacuums": {
    slug: "wetdry-vacuums",
    name: "Wet/Dry Vacuums (Shop Vacs)",
    short: "Tough garage and job-site vacuums that switch from dust to liquid and back.",
    description:
      "Wet/dry vacuums, or shop vacs, are the multi-volt workers of the vacuum world: they swallow sawdust, gravel, nail debris and standing water alike. If you have a garage, a workshop, a basement or a car to detail, one earns its space. This sub-hub covers power and portability choices, filter types, and the attachments that make a shop vac more than a bin with a hose.",
    metaDescription:
      "Wet/dry vacuum reviews and buying help — garage and workshop shop vacs for dust, liquids and automotive duty.",
    children: [],
    best: ["best-wet-dry-vacuums"],
    guides: ["how-to-choose-a-wet-dry-vacuum"],
    comparisons: ["shopvac-vs-ridgid-5gal"],
    featuredProducts: ["shopvac-5-gallon", "ryobi-18v-wetdry", "ridgid-5-gal-wetdry"],
    hubIntro: [
      "A wet/dry vac is a tool first, a vacuum second — choose for volume, hose reach and filter.",
      "Filter type decides whether fine dust stays in or vents out.",
      "Cordless models trade capacity for reaching where there's no socket.",
    ],
  },
"carpet-cleaners": {
    slug: "carpet-cleaners",
    name: "Carpet Cleaners (Extractors)",
    short: "Full-size machines that wash, scrub and extract dirt from wall-to-wall carpet.",
    description:
      "Full-size carpet cleaners are the whole-room deep-clean machines: they inject hot water and solution, scrub the pile, and extract the dirty liquid. They're the difference between a carpet that looks lived-in and one that looks new. This sub-hub covers the popular extractors, what separates a good one (heat, suction, tank size) and the routine that makes deep cleaning sustainable.",
    metaDescription:
      "Carpet cleaner (extractor) reviews and comparisons — whole-room deep cleaning for wall-to-wall carpet.",
    children: [],
    best: ["best-carpet-cleaners"],
    guides: [
      "how-often-should-carpets-be-cleaned",
      "how-to-deep-clean-carpet",
    ],
    comparisons: ["carpet-cleaner-spot-vs-full"],
    featuredProducts: ["bissell-proheat-2x-revolution", "hoover-power-scrub-deluxe", "rugdoctor-pro-deep", "tineco-carpet-one"],
    hubIntro: [
      "Deep-cleaning is a seasonal habit; the machine's hot water and suction decide the visible result.",
      "Tank size decides refills; heat retention decides drying time.",
      "A portable covers the incident, the full-size covers the room.",
    ],
  },
  "spot-cleaners": {
    slug: "spot-cleaners",
    name: "Spot Cleaners",
    short: "Portable extractors for pet accidents, sofa stains and car seats — exactly where it happens.",
    description:
      "Spot cleaners are the portable answer to the incidents life leaves on carpet, upholstery, stairs and car seats: carry the machine to the stain, extract it, done. They're small, nimble and built for exactly the crises a full-size cleaner can't justify lugging out. This sub-hub covers the popular portables, tank and tool trade-offs, and the pet-home argument for owning one.",
    metaDescription:
      "Spot cleaner reviews and buying help — portable extractors for pet accidents, cushion spills and car seats.",
    children: [],
    best: ["best-spot-cleaners"],
    guides: ["how-to-remove-pet-urine-smells"],
    comparisons: ["carpet-cleaner-spot-vs-full", "bissell-little-green-vs-hoover-spotclean"],
    featuredProducts: ["bissell-little-green", "hoover-spotclean"],
    hubIntro: [
      "Cleaning the stain where it sits beats dragging the stain to the machine.",
      "Tank size is the key spec — small units refill mid-incident.",
      "Every pet home should at least consider one; the cost of accidents over a year makes the case.",
    ],
  },
  "steam-mops": {
    slug: "steam-mops",
    name: "Steam Mops",
    short: "Hot-steam mops that sanitise sealed hard floors with water only.",
    description:
      "Steam mops clean sealed hard floors and tile with nothing but heat and water — no chemicals, bursting residue or bucket. They sanitise, dry fast, and are loved by households that want the chemistry out of the floor routine. This sub-hub covers how they work, where they're safe (never unsealed wood), and the honest comparison with spin and traditional mops.",
    metaDescription:
      "Steam mop reviews and comparisons — chemical-free sanitation for tile and sealed hard floors.",
    children: [],
    best: ["best-steam-mops"],
    guides: ["steam-mop-vs-traditional-mop"],
    comparisons: ["steam-vs-spin-mop"],
    featuredProducts: ["shark-steam-pocket-s3", "bissell-steambuddy"],
    hubIntro: [
      "Steam does hygiene that a bucket of soapy water only smears around.",
      "Fast drying is the quiet superpower — floors are done, not damp for an hour.",
      "Sealed floors only; unsealed wood and steam do not mix.",
    ],
  },
"upright-vacuums": {
    slug: "upright-vacuums",
    name: "Upright Vacuums",
    short: "The wall-to-wall carpet workhorse — big bins, strong suction, pet-hair depth.",
    description:
      "Uprights remain the default machine for wall-to-wall carpet, and for good reason: a powered brushroll, generous bin or bag capacity and one-pass suction make them the fastest way to clean a carpeted room. The modern lineup splits into pet-focused models with tangle-resistant brushrolls, value machines that undercut the premium brands, and lift-away designs that turn into a portable canister for stairs and above-floor work. This sub-hub covers the type's honest strengths, the brushroll and filtration choices that actually matter, and the models worth comparing before you buy.",
    metaDescription:
      "Upright vacuum reviews and buying help — carpet power, pet-hair depth and lift-away portability compared honestly.",
    children: [],
    best: ["best-upright-vacuums"],
    guides: ["how-to-choose-a-vacuum"],
    comparisons: ["canister-vs-upright"],
    featuredProducts: ["shark-navigator-lift-away", "hoover-windtunnel", "bissell-cleanview", "dyson-ball-upright"],
    hubIntro: [
      "Carpet density dictates the machine — deep pile wants a powered brushroll with height adjustment.",
      "Lift-away designs close the stair gap that used to send people out to buy a second vacuum.",
      "Pet hair rewards a tangle-resistant brushroll far more than any marketing claim on the box.",
    ],
  },
"floor-scrubbers": {
    slug: "floor-scrubbers",
    name: "Floor Scrubbers & Mop Vacuums",
    short: "One-pass scrub-and-suck machines for hard floors, from spin mops to wet-dry robovacs.",
    description:
      "Floor scrubbers span one handy category the industry sells under many names: spin mops that scrub, and vac-mops that scrub, clean and suck the water back up in one pass. They're the anti-bucket upgrade for sealed hard floors, and a rug-friendly variant exists for those who own area rugs too. This sub-hub covers the popular scrubbers and the wet-dry floor machines that make mopping a single action.",
    metaDescription:
      "Floor scrubber and vacuum-mop reviews — spin mops and self-cleaning vac-mops for sealed hard floors.",
    children: [],
    best: ["best-mops"],
    guides: [],
    comparisons: ["steam-vs-spin-mop", "tineco-vs-bissell-crosswave"],
    featuredProducts: ["tineco-floor-one-s7", "bissell-crosswave", "bissell-spinwave"],
    hubIntro: [
      "Scrub-and-suck vacuums the whole mopping affair down to one movement.",
      "Self-cleaning brushrolls remove the gross post-mop chore most people skip.",
      "Area rugs need a dedicated rug mode; the machine must match the home.",
    ],
  },
  "pressure-washers": {
    slug: "pressure-washers",
    name: "Pressure Washers",
    short: "Powerful jets for patios, driveways, cars and those never-again outdoor tasks.",
    description:
      "Pressure washers turn outdoor grime — patio moss, driveway oil, fence grey, car wheels — into a satisfying one-afternoon project. They range from compact electric units for patio duty to gas behemoths for big equestrian jobs. This sub-hub covers pressure (PSI) and flow (GPM) honestly, the right size for typical homes, and the safety and water-conservation notes that go with them.",
    metaDescription:
      "Pressure washer reviews and buying help — PSI, GPM, electric vs gas, and safe technique for outdoor cleaning.",
    children: [],
    best: ["best-pressure-washers"],
    guides: ["how-to-choose-a-pressure-washer"],
    featuredProducts: ["karcher-k5", "sun-joe-spx3000", "ryobi-pressure-washer"],
    hubIntro: [
      "PSI and GPM together decide what a washer can move — never read one alone.",
      "Electric suits the suburban patio drive; gas suits acreage and professionals.",
      "Detergent attachments turn a rinse into a de-grease.",
    ],
  },
"kitchen-sprays": {
    slug: "kitchen-sprays",
    name: "Kitchen Sprays & Degreasers",
    short: "Everyday spray-and-wipe degreasers and hard-surface kitchen cleaners.",
    description:
      "Kitchen sprays are the daily workhorses: degreasers for cooktops and counters, multi-surface sprays for the whole room, and foaming formulas for the appliances that collect fingerprints. This sub-hub covers the popular sprays honestly — what actually cuts grease, what just smells like it, and what's safe on your surfaces.",
    metaDescription:
      "Kitchen spray and degreaser reviews — everyday grease-cutting sprays and multi-surface kitchen cleaners.",
    children: [],
    best: ["best-kitchen-sprays"],
    guides: ["how-to-clean-stainless-steel"],
    featuredProducts: ["dawn-powerwash", "bar-keepers-friend", "formula-409"],
    hubIntro: [
      "Grease responds to surfactant load and dwell time, not perfume.",
      "Daily spray saves the weekend paste-clean.",
      "Read the surface list — multi-surface has limits.",
    ],
  },
  "stainless-steel-cleaners": {
    slug: "stainless-steel-cleaners",
    name: "Stainless Steel Cleaners",
    short: "Polishes and wipes that keep appliances fingerprint-free and streak-free.",
    description:
      "Stainless steel cleaners solve the eternal kitchen battle: the fingerprint-and-streak swirl. Along with technique (clean along the grain), the right polish or wipe disappears marks fast. This sub-hub covers the popular stainless cleaners, the wipe-versus-spray choice, and the honest split between daily polish and restoration chemistry.",
    metaDescription:
      "Stainless steel cleaner reviews — polishes and wipes that beat fingerprints and streaks on appliances.",
    children: [],
    best: ["best-stainless-steel-cleaners"],
    guides: ["how-to-clean-stainless-steel"],
    featuredProducts: ["weiman-stainless-wipes"],
    hubIntro: [
      "Streaks are a technique problem; polish fixes the residue, grain fixes the rest.",
      "Wipes win for speed; sprays win per-use economy.",
      "Stainless restoration is a season's firm, a daily clean is not.",
    ],
  },
"shower-cleaners": {
    slug: "shower-cleaners",
    name: "Shower Cleaners",
    short: "Sprays and foams that dissolve soap scum and hard-water spots on tile and glass.",
    description:
      "Shower cleaners fight the bathroom's most persistent enemy: the white film of soap scum and hard-water minerals that coats tile, glass and fixtures. Foaming sprays cling long enough to dissolve where thin sprays run off. This sub-hub covers the popular formulas, the daily-spray versus weekly-deep options, and surfaces that need gentler care.",
    metaDescription:
      "Shower cleaner reviews — foams and sprays that dissolve soap scum and hard water on tile and glass.",
    children: [],
    best: ["best-shower-cleaners"],
    guides: ["how-to-remove-soap-scum"],
    comparisons: ["grime-fighter-vs-daily-shower"],
    featuredProducts: ["scrubbing-bubbles-bathroom-grinder", "scrubbing-bubbles-daily-shower", "method-daily-shower"],
    hubIntro: [
      "Foam clings where a mist runs off — that's the whole game.",
      "Prevent with a daily spritz, restore with a gel leave-on.",
      "Ventilation and a squeegee beat any single product.",
    ],
  },
  "toilet-cleaners": {
    slug: "toilet-cleaners",
    name: "Toilet Cleaners",
    short: "Bowl gels, rim blocks and in-tank systems that keep porcelain clean between brushings.",
    description:
      "Toilet cleaning is the rare chore where the tool matters as much as the chemistry. Gels under the rim, rim blocks that clean each flush, and in-tank systems handle the constant low-level grime while a scrub brush and bleach handle the ring. This sub-hub covers the popular options and the honest division of labour between them.",
    metaDescription:
      "Toilet cleaner reviews — bowl gels, rim blocks and in-tank systems that keep porcelain fresh.",
    children: [],
    best: ["best-toilet-cleaners"],
    guides: ["how-to-clean-a-toilet"],
    comparisons: ["clorox-vs-lysol-toilet-bowl"],
    featuredProducts: ["clorox-toilet-bowl", "lysol-toilet-bowl-cleaner", "scrubbing-bubbles-toilet-gel"],
    hubIntro: [
      "Bowl gels do the daily work under the rim; the ring still calls for a brush.",
      "Rim and in-tank blocks ease constant fresh, but fade.",
      "The brush is non-negotiable; chemistry just makes it less frequent.",
    ],
  },
  "carpet-stain-removers": {
    slug: "carpet-stain-removers",
    name: "Carpet Stain Removers",
    short: "Targeted spot chemistry for carpet stains — the specialist stains the sprays miss.",
    description:
      "Carpet stain removers are the specialists that everyday sprays fail at: set-in marks, grease on pile, and the colours that survive a general-purpose clean. From instant spot sprays (Folex to the rescue) to enzyme liquids (for pet), the right formula kills the stain without bleaching the carpet. This sub-hub covers the popular spot formulas and how to use them.",
    metaDescription:
      "Carpet stain remover reviews — instant spot sprays and enzyme liquids that beat set-in carpet marks.",
    children: [],
    best: ["best-carpet-stain-removers"],
    guides: ["how-to-remove-pet-urine-smells", "how-to-remove-carpet-stains"],
    comparisons: ["steam-vs-spin-mop", "resolve-vs-folex"],
    featuredProducts: ["folex-instant-carpet-spot", "rocco-roxie", "resolve-carpet-spot"],
    hubIntro: [
      "Set-in carpet stains want a specialist chemistry, not another all-purpose spray.",
      "Instant spot formulas work fresh; enzymes work old.",
      "Always blot, patch-test and never rub.",
    ],
  },
"pet-urine-removers": {
    slug: "pet-urine-removers",
    name: "Pet Urine Removers",
    short: "Enzyme cleaners that digest urine and accident residue instead of masking it.",
    description:
      "Enzyme cleaners are the only honest answer to urine and pet accident residue: instead of covering the smell with fragrance, their enzymes digest the organic matter the smell rides on. They're essential for pet homes and uniquely stubborn on old stains. This sub-hub covers the popular enzyme brands, the age-of-stain differences, and the saturation technique that makes them work.",
    metaDescription:
      "Pet urine remover reviews — enzyme cleaners that digest urine residue, for fresh accidents and old stains.",
    children: [],
    best: ["best-pet-urine-removers"],
    comparisons: ["natures-miracle-vs-rocco"],
    guides: ["how-to-remove-pet-urine-smells"],
    featuredProducts: ["natures-miracle", "rocco-roxie"],
    hubIntro: [
      "Enzymes digest what disinfectants only fragrance over.",
      "Selection follows stain age: fresh accidents and set-in marks differ.",
      "Saturate past the visible edge and give it hours — not seconds.",
    ],
  },
  mops: {
    slug: "mops",
    name: "Mops",
    short: "Spin mops, string mops and sweepers for hard floors of every kind.",
    description:
      "The humble mop has modernised: spin mops wring with a handle twist and a bucket pedal, steam mops add heat, and sweepers with swappable pads turn mopping into a quick dance. Choice follows your floor. This sub-hub covers the popular mops and the honest split for sealed hard floors, wood and tile.",
    metaDescription:
      "Mop reviews — spin mops, steam mops, traditional mops and sweepers compared for hard floors.",
    children: [],
    best: ["best-mops"],
    guides: ["steam-mop-vs-traditional-mop", "how-to-mop-hard-floors"],
    comparisons: ["steam-vs-spin-mop"],
    featuredProducts: ["o-cel-o-spin-mop", "swiffer-sweeper", "libman-wonder-mop"],
    hubIntro: [
      "The mop follows the floor: spin for wood-safe control, steam for sealed hardness.",
      "Hands-free wringing changes the chore more than marketing suggests.",
      "Mop with one pass of clean, not one pass of dirty water.",
    ],
  },
brooms: {
    slug: "brooms",
    name: "Brooms & Dustpans",
    short: "Genuinely good brooms — the low-tech upgrade nobody regrets.",
    description:
      "The broom is the oldest cleaning tool and still the right one for a surprising number of floors and spills. Modern brooms get the stance, bristle and grab right in ways a chewed-up supermarket broom never will. This sub-hub covers brooms, dustpans and the sweep-up technique that makes them faster than a vacuum for daily crumbs.",
    metaDescription:
      "Broom and dustpan reviews — the low-tech sweep upgrade that beats the vacuum on crumbs and small spills.",
    children: [],
    best: ["best-brooms"],
    guides: ["how-to-sweep-and-choose-a-broom"],
    comparisons: ["libman-vs-oxo-brooms"],
    featuredProducts: ["casabella-broom", "libman-broom"],
    hubIntro: [
      "A good broom catches crumbs instead of redistributing them.",
      "Indoor/outdoor bristle splits mean less grain in the kitchen.",
      "Sweep toward one point, pan with a grit edge, done.",
    ],
  },
  "microfiber-cloths": {
    slug: "microfiber-cloths",
    name: "Microfiber Cloths",
    short: "The reusable, streak-free surface cloths that remove chemistry from the routine.",
    description:
      "Microfiber cloths are the flu of the contemporary supply shelf: they wipe, dust, polish and lift without needing a single chemical, and they last for years — as long as you launder them right. This sub-hub covers weave weights, colour-coding households, and the wash rules that keep them effective past the first months.",
    metaDescription:
      "Microfiber cloth reviews — reusable, streak-free surface cloths and the care rules that keep them effective.",
    children: [],
    best: ["best-microfiber-cloths"],
    guides: ["microfiber-cloth-care"],
    comparisons: ["easy-ology-vs-e-cloth-microfiber"],
    featuredProducts: ["easy-ology-microfiber", "e-cloth-microfiber"],
    hubIntro: [
      "Microfiber lifts without chemicals — the washer does the cleaning.",
      "The cheap ones shred, the good ones last seasons.",
      "Skip fabric softener, or the grab goes away.",
    ],
  },
detergents: {
    slug: "detergents",
    name: "Laundry Detergents",
    short: "HE liquid detergents — how to pick by washer, hardness and the marks you actually fight.",
    description:
      "He detergent choice is mostly a story of emphasis: stain removal, odour removal, fragrance depth or scent-free caution. Modern HE liquids for high-efficiency washers are far closer in baseline power than the marketing suggests, which makes your specific pain point the deciding factor. This sub-hub covers the popular HE detergents and the honest differences.",
    metaDescription:
      "Laundry detergent reviews for HE washers — how to choose by stain range, odour removal and water hardness.",
    children: [],
    best: ["best-detergents"],
    guides: ["how-to-choose-a-laundry-detergent"],
    comparisons: ["gain-vs-arm-and-hammer-detergents"],
    featuredProducts: ["tide-hygienic-clean", "persil-proclean", "gain-laundry-detergent", "arm-and-hammer-clean-burst"],
    hubIntro: [
      "HE liquids are close in baseline power; they differ in specialty and scent.",
      "Dose by label and water hardness — overdosing builds residue, not clean.",
      "Cold wash is fine for most loads; hot rules are for oil, bacteria and whites.",
    ],
  },
  "stain-removers": {
    slug: "stain-removers",
    name: "Stain Removers",
    short: "Pre-treatments and boosters for the marks that survive a first wash.",
    description:
      "Stain removers exist to finish the job the detergent started: pre-treatments get applied before the wash, boosters go with the load, and both target the proteins, grease and tannins that otherwise set. The honest rule is timing — a stain treated before the first wash is a memory; one dried first is a project. This sub-hub covers the popular formulas and the technique that makes them work.",
    metaDescription:
      "Laundry stain remover reviews — pre-treatments and boosters for proteins, grease and the marks that survive.",
    children: [],
    best: ["best-laundry-stain-removers"],
    guides: ["how-to-remove-tough-stains"],
    comparisons: ["oxiclean-vs-shout"],
    featuredProducts: ["oxi-clean-maxforce", "tide-to-go"],
    hubIntro: [
      "Pre-wash applied to the stain beats post-wash amends.",
      "Protein and grease need different chemistry than grass and wine.",
      "Never heat a stain before it's out — heat sets what washing removes.",
    ],
  },
"fabric-softeners": {
    slug: "fabric-softeners",
    name: "Fabric Softeners & Scent Boosters",
    short: "Softeners, dryers and scent boosters — the luxury layer of the laundry load.",
    description:
      "Fabric softeners and scent boosters are the optional luxury layer of laundry: softer towels, long-lasting fragrance, less static. They also carry real trade-offs — softeners reduce towel absorbency and build up on machine parts, and scent is the most polarizing topic in the whole wash. This sub-hub covers the popular options honestly, including when to skip them.",
    metaDescription:
      "Fabric softener and scent booster reviews — softness and long-lasting fragrance, with the trade-offs on towels and machines.",
    children: [],
    best: ["best-fabric-softeners-and-boosters"],
    guides: ["how-to-choose-and-use-fabric-softeners"],
    comparisons: ["downy-unstopables-vs-bounce-dryer-sheets"],
    featuredProducts: ["downy-unstopables", "downy-rinse-and-refresh", "bounce-dryer-sheets"],
    hubIntro: [
      "Softeners trade a soft touch for towel absorbency — choose by load.",
      "Scent boosters are the polarizing piece; most homes either love or ban them.",
      "Build-up on machine parts is the quiet cost of constant softener use.",
    ],
  },
  "washing-machine-cleaners": {
    slug: "washing-machine-cleaners",
    name: "Washing Machine Cleaners",
    short: "Tablets and descaling cleans that stop the cleaner itself getting musty.",
    description:
      "The washing machine is the most-used cleaning appliance and one of the least cleaned. Soap scum, hard-water scale and gasket biofilm build up until the machine smells — and then your clothes smell. Washing machine cleaners, descaling tablets and gasket care are the maintenance that keeps the whole system fresh. This sub-hub covers the popular options and the rhythm that works.",
    metaDescription:
      "Washing machine cleaner reviews — tablets and descalers that stop musty machines and residue on clothes.",
    children: [],
    best: ["best-washing-machine-cleaners"],
    guides: ["how-to-clean-a-washing-machine"],
    comparisons: ["affresh-vs-glisten-washer-cleaners"],
    featuredProducts: ["affresh-washer-cleaner"],
    hubIntro: [
      "Gasket biofilm is the musty-smell architect; wiping it dry is the single habit.",
      "A monthly cleaner cycle beats the quarterly rescue.",
      "Hard-water homes add descaling to the rhythm, not just fun.",
    ],
  },
"oven-cleaners": {
    slug: "oven-cleaners",
    name: "Oven & Cooktop Cleaners",
    short: "Sprays, creams and kits that cut baked-on grease from ovens and glass cooktops.",
    description:
      "Ovens and glass cooktops reward targeted chemistry: the right spray-and-wait degreaser turns a baked-on mess into a wipe-down, and a purpose-made cooktop cleaner keeps a smooth glass surface looking new. This sub-hub covers the heavy-duty oven sprays, the lower-fume alternatives, and the cleaner-and-pad kits made for ceramic-glass cooktops. Because these are strong products used in small, hot kitchens, we keep ventilation and surface-safety advice front and centre.",
    metaDescription:
      "Oven and glass cooktop cleaner reviews — heavy-duty sprays and cooktop kits that cut baked-on grease. Research-based buying help.",
    children: [],
    best: ["best-oven-cleaners"],
    guides: ["how-to-clean-an-oven", "how-to-clean-a-glass-cooktop"],
    comparisons: ["weiman-vs-easy-off-oven-cleaners"],
    featuredProducts: ["weiman-heavy-duty-oven-cleaner", "easy-off-fume-free-oven-cleaner", "weiman-glass-cooktop-cleaner-kit"],
    hubIntro: [
      "Spray-and-wait chemistry does the scrubbing; choose the formula by how much build-up you face.",
      "A fume-free formula changes the unpleasantness, not necessarily the power.",
      "Glass cooktops need the dedicated pad-and-polish routine — harsh abrasives scratch them.",
    ],
  },
  "dishwasher-cleaners": {
    slug: "dishwasher-cleaners",
    name: "Dishwasher Cleaners",
    short: "Monthly tablets that strip grease, limescale and odour from inside the machine.",
    description:
      "A dishwasher cleans dishes — but the machine itself slowly collects grease film, limescale and the damp odours that cling to filters and seals. A monthly cleaner tablet is the maintenance answer: it dissolves during the machine's own cycle to strip build-up and freshen the interior without taking the dishwasher apart. This sub-hub covers the leading tablets, what they do (and don't do), and the simple monthly routine that keeps a machine performing.",
    metaDescription:
      "Dishwasher cleaner reviews — monthly tablets that remove grease, limescale and odour. Research-based maintenance help.",
    children: [],
    best: ["best-dishwasher-cleaners"],
    guides: ["how-to-clean-a-dishwasher"],
    comparisons: ["glisten-vs-affresh-dishwasher-cleaners"],
    featuredProducts: ["glisten-dishwasher-cleaner", "affresh-dishwasher-cleaner", "finish-max-in-3-dishwasher-cleaner"],
    hubIntro: [
      "The monthly tablet does the disassembly-free deep clean that a wipe-down cannot.",
      "A musty dishwasher is a film-and-moisture problem first, a smell problem second.",
      "Choose by scent preference — fragrance-free options cover the same ground.",
    ],
  },
"green-all-purpose-cleaners": {
    slug: "green-all-purpose-cleaners",
    name: "Green All-in-One Cleaners",
    short: "Plant-based sprays, concentrates and on-site cleaner systems that cover the whole home.",
    description:
      "Green all-purpose cleaning is the switch most households make first: a plant-based spray, a concentrate you dilute, or an on-site system that generates its own cleaner. Each approach trades a little of the conventional shelf for fewer bottles and lighter chemistry, and each has honest limits on heavy, baked-on mess. This sub-hub covers the all-in-one sprays, concentrates and devices that genuinely replace multiple single-purpose products.",
    metaDescription:
      "Green all-purpose cleaner reviews — plant-based sprays, concentrates and on-site cleaner systems that work across the whole home.",
    children: [],
    best: ["best-green-all-purpose-cleaners", "best-eco-friendly-cleaners"],
    guides: ["how-to-switch-to-green-cleaning"],
    comparisons: ["concentrate-vs-on-site-generator"],
    featuredProducts: ["ecover-multi-surface", "biokleen-all-purpose", "force-of-nature", "branch-basics", "seventh-generation-disinfecting", "mrs-meyers-multi-surface"],
    hubIntro: [
      "Concentrates and refills beat single-use sprays on plastic per clean.",
      "Green formulas need dwell time more often than conventional ones.",
      "Match the chemistry to the surface — green doesn't mean universal.",
    ],
  },
  "eco-dish-soaps-and-pods": {
    slug: "eco-dish-soaps-and-pods",
    name: "Eco Dish Soaps & Pods",
    short: "Plant-based dish liquids and low-plastic dishwasher pods that keep dishes clean with a smaller footprint.",
    description:
      "The sink and the dishwasher are where eco habits hit their daily rhythm. Plant-based dish liquids cut grease without the heavy scent, while low-plastic pods and plastic-free tablets handle the machine — all competing closely with mainstream options on price per load. This sub-hub covers hand dishwashing soaps, dishwasher pods and tablets, plus the refill systems that keep the plastic low over time.",
    metaDescription:
      "Eco dish soap and dishwasher pod reviews — plant-based dish liquids, low-plastic pods and plastic-free tablets that clean without the footprint.",
    children: [],
    best: ["best-eco-dish-and-tablets"],
    guides: ["how-to-clean-dishes-with-less-plastic"],
    comparisons: ["dropps-vs-blueland"],
    featuredProducts: ["ecover-dish-soap", "grove-dish-soap", "dropps-dishwasher-pods", "blueland-dish-tablets", "seventh-generation-dish-liquid"],
    hubIntro: [
      "Dish soap is the easiest daily green swap — same habit, kinder chemistry.",
      "Pods and tablets beat bottles on plastic per load, not per wash.",
      "Refill systems pay off only if you keep the bottle.",
    ],
  },
"bathroom-tile-grout": {
    slug: "bathroom-tile-grout",
    name: "Tile, Grout & Tub Cleaners",
    short: "The cleaners that cut soap scum, foam shower walls and lift mold from grout and tile.",
    description:
      "The tile, tub and grout sub-hub is where the weekly bathroom clean actually happens. Foaming cleaners cling to vertical walls and cut soap scum, while mold and mildew removers deal with the black spots that build in grout lines and damp corners. This sub-hub covers foam cleaners for shower walls and tubs, bleach-based mold removers, and plant-based daily options that cut scum without the chemical blast.",
    metaDescription:
      "Tile, grout and tub cleaner reviews — foaming bathroom cleaners, mold and mildew removers and natural options compared for soap scum and grout.",
    children: [],
    best: ["best-tile-grout-cleaners", "best-shower-cleaners"],
    guides: ["how-to-clean-shower-and-grout"],
    comparisons: ["kaboom-vs-tilex"],
    featuredProducts: ["kaboom-shower-tub-tile", "tilex-mold-mildew", "better-life-bathroom"],
    hubIntro: [
      "Foam clings where liquid runs off — the vertical wall decides the product.",
      "Mold removal fixes the stain; airflow fixes the return.",
      "A bathroom that dries well needs less chemistry than one left wet.",
    ],
  },
  "limescale-removers": {
    slug: "limescale-removers",
    name: "Limescale & Hard-Water Removers",
    short: "Acid-based descalers that dissolve hard-water film, mineral deposits and rust.",
    description:
      "Hard water leaves its mark on shower glass, chrome, porcelain and appliances: white film, limescale rings and rust streaks that general cleaners only polish around. Limescale removers are the acid-based chemistry that actually dissolves those deposits. This sub-hub covers multi-surface descalers, bathroom-tuned sprays and the acid precautions every hard-water home needs.",
    metaDescription:
      "Limescale and hard-water remover reviews — CLR, Lime-A-Way and acid-based descalers that dissolve mineral deposits and rust from fixtures.",
    children: [],
    best: ["best-limescale-removers"],
    guides: ["how-to-remove-hard-water-stains"],
    comparisons: ["clr-vs-lime-a-way"],
    featuredProducts: ["clr-calcium-lime-rust", "lime-a-way", "bar-keepers-friend"],
    hubIntro: [
      "Descaling works on deposits — a cleaner that just wipes won't remove scale.",
      "Know your surface: acid chemistry is off-limits for natural stone.",
      "A squeegee after each shower is still the cheapest hard-water prevention.",
    ],
  },
"eco-laundry-detergents": {
    slug: "eco-laundry-detergents",
    name: "Eco Laundry Detergents",
    short: "Plant-based, fragrance-free and plastic-free detergent options that clean without the petrochemical jug.",
    description:
      "Eco laundry detergents swap petrochemical surfactants for plant-based clean, dye-free and fragrance-free formulas for sensitive households, and pre-measured pods in plastic-free packaging for less waste. This sub-hub covers liquid plant-based detergents, the trusted sensitive pick and the eco pod alternative — with the honest note that everyday soil is the habitat and heavy set-in stains still call for a pretreater.",
    metaDescription:
      "Eco laundry detergent reviews — plant-based liquids, fragrance-free formulas and plastic-free pods compared for green households.",
    children: [],
    best: ["best-eco-laundry-detergents", "best-detergents"],
    guides: ["how-to-remove-tough-stains", "how-to-choose-an-eco-laundry-detergent"],
    comparisons: ["dropps-vs-ecover"],
    featuredProducts: ["ecover-laundry-liquid", "seventh-generation-free-clear", "dropps-laundry-pods"],
    hubIntro: [
      "Green detergent means ditching petrochemicals, not weakening the clean.",
      "Fragrance-free buys are a formula choice for reactive skin — not a compromise.",
      "Pre-measured pods and plastic-free packaging attack waste; pods cost more per load.",
    ],
  },
"glass-window-cleaners": {
    slug: "glass-window-cleaners",
    name: "Glass & Window Cleaners",
    short: "Sprays and foams that cut smudges and dry streak-free on windows, mirrors and glass.",
    description:
      "Glass cleaning is a streak problem disguised as a grime problem — the product has to cut smudges and then leave nothing behind. This sub-hub covers the iconic blue bottle, the foam aerosol that clings to vertical panes, and the detailing favourite that leaves glass residue-free. Compare on streak-free finish, vertical cling and surface range.",
    metaDescription:
      "Glass and window cleaner reviews — Windex, Sprayway and residue-free formulas compared for streak-free windows and mirrors.",
    children: [],
    best: ["best-glass-cleaners"],
    guides: ["how-to-clean-windows-streak-free"],
    comparisons: ["windex-vs-sprayway"],
    featuredProducts: ["windex-original", "sprayway-glass-cleaner", "invisible-glass"],
    hubIntro: [
      "Glass cleaning is a streak problem — the film the product leaves behind is the enemy.",
      "Cloth matters as much as chemistry: use one that doesn't shed.",
      "Sun-dried windows streak; work them in shade or evening.",
    ],
  },
  "wood-and-furniture-polish": {
    slug: "wood-and-furniture-polish",
    name: "Wood & Furniture Polish",
    short: "Sprays and lemon oils that dust, shine and condition finished wood and furniture.",
    description:
      "Wood care splits into two honest jobs: quick dust-and-shine on finished pieces, and conditioning for dry, antique or water-marked wood. This sub-hub covers the aerosol polishes that protect finished tables and cabinets, and the lemon oils that feed thirsty grain. Compare on one-pass convenience, conditioning depth and surface suitability.",
    metaDescription:
      "Wood and furniture polish reviews — aerosol polishes and lemon oils compared for finished wood, antiques and water marks.",
    children: [],
    best: ["best-wood-furniture-polish"],
    guides: ["how-to-polish-and-condition-wood"],
    comparisons: ["pledge-vs-old-english"],
    featuredProducts: ["pledge-lemon-polish", "old-english-lemon-oil", "weiman-furniture-polish"],
    hubIntro: [
      "Polish maintains finished wood; oil conditions the thirsty piece — know which job you're doing.",
      "A dusting cloth collecting dust is the real air-pollution fix; polish makes it satisfying.",
      "Test any polish on an inconspicuous area first, ever on antiques.",
    ],
  },
"pet-hair-removal-tools": {
    slug: "pet-hair-removal-tools",
    name: "Pet Hair Removal Tools",
    short: "Reusable rollers and rubber brushes that lift fur from fabric without sticky refills.",
    description:
      "Pet hair is a mechanical problem, so the best answers are mechanical too: reusable rollers and rubber-bristle brushes that grab fur and dander with friction instead of adhesive strips that lose their tack, or a vacuum that must be plugged in and unclogged. This sub-hub covers the popular modern tools for sofas, car seats, bedding and the daily linting loop that keeps soft goods wearable.",
    metaDescription:
      "Pet hair removal tools — reusable rollers and rubber brushes that lift fur and dander from sofa, car seats and bedding without sticky refills.",
    children: [],
    best: ["best-pet-hair-removal-tools"],
    comparisons: ["chom-chom-vs-furemover"],
    guides: ["how-to-remove-pet-hair-from-fabric"],
    featuredProducts: ["chom-chom-roller", "furemover"],
    hubIntro: [
      "Rubber and friction outlast sticky sheets for the fur loop.",
      "Tool-first beats battery-first for sofas and car seats.",
    ],
  },
  "pet-odour-removers": {
    slug: "pet-odour-removers",
    name: "Pet Odour Removers",
    short: "Citrus-neutralisers and fabric sprays that lift general pet smells, not just urine.",
    description:
      "Not every pet smell is an accident stain. General odours settle into fabrics, litter-box areas and soft furnishings, and this sub-hub covers the non-enzyme chemistry that lifts them: citrus-based odour eliminators and fabric refreshers that neutralise embedded smells rather than overlaying scent. It sits beside the enzyme hub for urine-specific jobs.",
    metaDescription:
      "Pet odour remover reviews — citrus-neutralising sprays and fabric refreshers that lift general pet smells from sofa, bedding and litter areas.",
    children: [],
    best: ["best-pet-odour-removers"],
    comparisons: ["angry-orange-vs-natures-miracle"],
    guides: ["how-to-remove-pet-odours-from-fabric"],
    featuredProducts: ["angry-orange", "febreze-fabric"],
    hubIntro: [
      "Citrus and cyclodextrin neutralise; enzymes digest urine.",
      "A fabric refresher is the post-vacuum pass that keeps soft goods fresh.",
    ],
  },
"dusters": {
    slug: "dusters",
    name: "Dusters",
    short: "Extendable static dusters that reach the above-floor dust a cloth can't.",
    description:
      "The dust that bothers you most is rarely at floor level: fans, blades, blinds, shelf tops and picture frames collect it where hands and cloths struggle. Dusters solve that with static and reach — feather-like fibres trap dust on contact, and an extendable handle takes the work up. This sub-hub covers the popular duster systems and the technique to keep them effective.",
    metaDescription:
      "Duster reviews — extendable static dusters that reach ceiling fans, blinds and shelving where cloths can't.",
    children: [],
    best: ["best-dusters"],
    guides: ["how-to-dust-and-choose-a-duster"],
    featuredProducts: ["swiffer-duster"],
    hubIntro: [
      "Static traps above-floor dust; extendable reach saves the ladder.",
      "The duster is the between-deep-clean tool — regular passes keep the dust from ever settling.",
    ],
  },
  "scouring-pads": {
    slug: "scouring-pads",
    name: "Scouring Pads & Erasers",
    short: "Water-activated foam and scrub pads for marks and baked-on residue.",
    description:
      "Some messes don't respond to liquid cleaning — they are physical marks and baked-on residue that need abrasion. Scouring pads and melamine-foam erasers fill that gap: safe abrasives that lift scuffs, marks and set-on grime instead of dissolving them. This sub-hub covers the famously versatile pads and the surface-safe way to use them.",
    metaDescription:
      "Scouring pad and eraser reviews — water-activated melamine foam and non-scratch scrub pads for scuffs and baked-on residue.",
    children: [],
    best: ["best-scouring-pads"],
    guides: ["how-to-remove-scuffs-and-marks"],
    comparisons: ["magic-eraser-vs-scrub-daddy"],
    featuredProducts: ["mr-clean-magic-eraser", "scotch-brite-scour-pads", "scrub-daddy"],
    hubIntro: [
      "Physical marks need mechanical abrasion, not more liquid.",
      "Water-activated foam lifts scuffs; scrub pads shift baked-on residue.",
      "Always spot-test — abrasion is powerful, so respect the surface.",
    ],
  },
"drain-cleaners": {
    slug: "drain-cleaners",
    name: "Drain Cleaners",
    short: "Clog-busting gels and liquids for slow drains and plumbing gunk.",
    description:
      "A slow drain is one of the few cleaning problems that lives inside a pipe, out of reach of sprays and cloths. Drain cleaners solve it with thick gel formulas and bleach-powered liquids that cut through standing water, cling to the clog and dissolve hair, soap scum and food build-up without calling a plumber. This sub-hub covers the chemical approach to common drain problems.",
    metaDescription:
      "Drain cleaner reviews — thick gels and bleach-powered liquids for slow drains and plumbing gunk. Compare the famous names here.",
    children: [],
    best: ["best-drain-cleaners"],
    guides: ["how-to-unclog-a-drain"],
    comparisons: ["drano-vs-liquid-plumr"],
    featuredProducts: ["drano-max-gel", "liquid-plumr"],
    hubIntro: [
      "Slow drains are the plumbing-gunk problem you can fix on a Saturday.",
      "Gel formulas cut through standing water; basics keep drains clean.",
      "Use the physical plunge first, the chemical gel second.",
    ],
  },
"concentrates-and-refill-systems": {
    slug: "concentrates-and-refill-systems",
    name: "Concentrates & Refill Systems",
    short: "Tablets, cartridges and dilution systems that replace whole shelves of bottled sprays.",
    description:
      "The concentrates-and-refills approach trades bottled sprays for tablets, cartridges and dilution — you buy the active cleaner in its densest form and let water do the rest. Systems range from a single multi-purpose tablet to brand-locked refill lines, and the real test is whether the convenience holds. If cleaning happens at the counter spray and the refill is small and flat, you've cut plastic per clean dramatically. This sub-hub covers the tablet cleaners and reusable-bottle refill systems that genuinely replace several single-purpose sprays.",
    metaDescription:
      "Concentrates and refill systems review — cleaner tablets and reusable bottle refills that replace bottled sprays with less plastic.",
    children: [],
    best: ["best-concentrate-and-refill-cleaners"],
    guides: ["how-to-use-cleaning-concentrates"],
    comparisons: ["blueland-vs-grove-multi-surface"],
    featuredProducts: ["blueland-multi-surface", "grove-multi-surface-refill", "branch-basics", "force-of-nature"],
    hubIntro: [
      "Tablets and cartridges are the densest form of cleaner — little plastic per spray.",
      "A reusable bottle makes the math work; a disposable bottle defeats it.",
      "Refill systems win only if you keep the bottle and actually buy the refill.",
      "Concentrate discipline beats branded variety — dilute as labelled.",
    ],
  },
};
