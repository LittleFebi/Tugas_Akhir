// // JS/data_soal.js
// const databaseSoal = {
//     // 1. TEMA KOTA
//     kota: [
//         { id: 1, type: "image", image: "../assets/data/ambulance.jpg", audio: "../assets/audio/kota/ambulance.mp3", correct: "AMBULANCE", wrong: ["HOSPITAL", "MOTORCYCLE", "BRIDGE"] },
//         { id: 2, type: "image", image: "../assets/data/hospital.jpg", audio: "../assets/audio/kota/hospital.mp3", correct: "HOSPITAL", wrong: ["CINEMA", "LIBRARY", "AMBULANCE"] },
//         { id: 3, type: "image", image: "../assets/data/motorcycle.jpg", audio: "../assets/audio/kota/motorcycle.mp3", correct: "MOTORCYCLE", wrong: ["TRAIN", "PLANE", "STREET"] },
//         { id: 4, type: "image", image: "../assets/data/bridge.jpg", audio: "../assets/audio/kota/bridge.mp3", correct: "BRIDGE", wrong: ["ROAD", "SIDEWALK", "CROSSWALK"] },
//         { id: 5, type: "image", image: "../assets/data/cinema.jpg", audio: "../assets/audio/kota/cinema.mp3", correct: "CINEMA", wrong: ["WATERPARK", "PLAYGROUND", "LIBRARY"] },
//         { id: 6, type: "image", image: "../assets/data/street.jpg", audio: "../assets/audio/kota/street.mp3", correct: "STREET", wrong: ["TRAFFIC", "CROSSWALK", "SIDEWALK"] },
//         { id: 7, type: "text", audio: "../assets/audio/kota/sidewalk.mp3", correct: "SIDEWALK", wrong: ["ROAD", "BRIDGE", "STREET"] },
//         { id: 8, type: "text", audio: "../assets/audio/kota/library.mp3", correct: "LIBRARY", wrong: ["HOSPITAL", "CINEMA", "SCHOOL"] },
//         { id: 9, type: "text", audio: "../assets/audio/kota/road.mp3", correct: "ROAD", wrong: ["BRIDGE", "STREET", "SIDEWALK"] },
//         { id: 10, type: "text", audio: "../assets/audio/kota/crosswalk.mp3", correct: "CROSSWALK", wrong: ["TRAFFIC", "ROAD", "SIDEWALK"] },
//         { id: 11, type: "text", audio: "../assets/audio/kota/train.mp3", correct: "TRAIN", wrong: ["PLANE", "MOTORCYCLE", "AMBULANCE"] },
//         { id: 12, type: "text", audio: "../assets/audio/kota/plane.mp3", correct: "PLANE", wrong: ["TRAIN", "MOTORCYCLE", "AMBULANCE"] },
//         { id: 13, type: "text", audio: "../assets/audio/kota/traffic.mp3", correct: "TRAFFIC", wrong: ["STREET", "ROAD", "CROSSWALK"] },
//         { id: 14, type: "text", audio: "../assets/audio/kota/waterpark.mp3", correct: "WATERPARK", wrong: ["PLAYGROUND", "CINEMA", "LIBRARY"] },
//         { id: 15, type: "text", audio: "../assets/audio/kota/playground.mp3", correct: "PLAYGROUND", wrong: ["WATERPARK", "HOSPITAL", "CINEMA"] }
//     ],

//     // 2. TEMA RUMAH
//     rumah: [
//         { id: 1, type: "image", image: "../assets/data/bedroom.jpg", audio: "../assets/audio/home/bedroom.mp3", correct: "BEDROOM", wrong: ["KITCHEN", "BATHROOM", "GARAGE"] },
//         { id: 2, type: "image", image: "../assets/data/pantry.jpg", audio: "../assets/audio/home/pantry.mp3", correct: "PANTRY", wrong: ["ATTIC", "BASEMENT", "TERRACE"] },
//         { id: 3, type: "image", image: "../assets/data/spoon.jpg", audio: "../assets/audio/home/spoon.mp3", correct: "SPOON", wrong: ["KNIFE", "SOFA", "FAN"] },
//         { id: 4, type: "image", image: "../assets/data/knife.jpg", audio: "../assets/audio/home/knife.mp3", correct: "KNIFE", wrong: ["SPOON", "SUITCASE", "SOFA"] },
//         { id: 5, type: "image", image: "../assets/data/kitchen.jpg", audio: "../assets/audio/home/kitchen.mp3", correct: "KITCHEN", wrong: ["BEDROOM", "BATHROOM", "GARAGE"] },
//         { id: 6, type: "image", image: "../assets/data/bathroom.jpg", audio: "../assets/audio/home/bathroom.mp3", correct: "BATHROOM", wrong: ["BEDROOM", "KITCHEN", "BASEMENT"] },
//         { id: 7, type: "image", image: "../assets/data/fan.jpg", audio: "../assets/audio/home/fan.mp3", correct: "FAN", wrong: ["SOFA", "KNIFE", "SPOON"] },
//         { id: 8, type: "image", image: "../assets/data/sofa.jpg", audio: "../assets/audio/home/sofa.mp3", correct: "SOFA", wrong: ["FAN", "SUITCASE", "BEDROOM"] },
//         { id: 9, type: "image", image: "../assets/data/suitcase.jpg", audio: "../assets/audio/home/suitcase.mp3", correct: "SUITCASE", wrong: ["SOFA", "FAN", "KNIFE"] },
//         { id: 10, type: "text", audio: "../assets/audio/home/garage.mp3", correct: "GARAGE", wrong: ["CAR", "TERRACE", "STAIRCASE"] },
//         { id: 11, type: "text", audio: "../assets/audio/home/terrace.mp3", correct: "TERRACE", wrong: ["GARAGE", "ATTIC", "BASEMENT"] },
//         { id: 12, type: "text", audio: "../assets/audio/home/staircase.mp3", correct: "STAIRCASE", wrong: ["BASEMENT", "ATTIC", "TERRACE"] },
//         { id: 13, type: "text", audio: "../assets/audio/home/basement.mp3", correct: "BASEMENT", wrong: ["ATTIC", "TERRACE", "GARAGE"] },
//         { id: 14, type: "text", audio: "../assets/audio/home/attic.mp3", correct: "ATTIC", wrong: ["BASEMENT", "TERRACE", "STAIRCASE"] },
//         { id: 15, type: "text", audio: "../assets/audio/home/car.mp3", correct: "CAR", wrong: ["GARAGE", "FAN", "SOFA"] }
//     ],

//     // 3. TEMA KEBUN
//     kebun: [
//         { id: 1, type: "image", image: "../assets/data/flower.jpg", audio: "../assets/audio/garden/flower.mp3", correct: "FLOWER", wrong: ["TREE", "LEAF", "BIRD"] },
//         { id: 2, type: "image", image: "../assets/data/fence.jpg", audio: "../assets/audio/garden/fence.mp3", correct: "FENCE", wrong: ["SAND", "GLASS", "TREE"] },
//         { id: 3, type: "image", image: "../assets/data/bird.jpg", audio: "../assets/audio/garden/bird.mp3", correct: "BIRD", wrong: ["BUTTERFLY", "INSECT", "WORM"] },
//         { id: 4, type: "image", image: "../assets/data/butterfly.jpg", audio: "../assets/audio/garden/butterfly.mp3", correct: "BUTTERFLY", wrong: ["BIRD", "INSECT", "WORM"] },
//         { id: 5, type: "image", image: "../assets/data/insect.jpg", audio: "../assets/audio/garden/insect.mp3", correct: "INSECT", wrong: ["WORM", "BUTTERFLY", "BIRD"] },
//         { id: 6, type: "image", image: "../assets/data/worm.jpg", audio: "../assets/audio/garden/worm.mp3", correct: "WORM", wrong: ["INSECT", "BUTTERFLY", "BIRD"] },
//         { id: 7, type: "text", audio: "../assets/audio/garden/sun.mp3", correct: "SUN", wrong: ["RAIN", "CLOUD", "SAND"] },
//         { id: 8, type: "text", audio: "../assets/audio/garden/rain.mp3", correct: "RAIN", wrong: ["SUN", "CLOUD", "LEAF"] },
//         { id: 9, type: "text", audio: "../assets/audio/garden/cloud.mp3", correct: "CLOUD", wrong: ["SUN", "RAIN", "SAND"] },
//         { id: 10, type: "text", audio: "../assets/audio/garden/tree.mp3", correct: "TREE", wrong: ["FLOWER", "LEAF", "FENCE"] },
//         { id: 11, type: "text", audio: "../assets/audio/garden/leaf.mp3", correct: "LEAF", wrong: ["TREE", "FLOWER", "WORM"] },
//         { id: 12, type: "text", audio: "../assets/audio/garden/sand.mp3", correct: "SAND", wrong: ["CLOUD", "GLASS", "RAIN"] },
//         { id: 13, type: "text", audio: "../assets/audio/garden/glass.mp3", correct: "GLASS", wrong: ["SAND", "SUN", "FENCE"] },
//         { id: 14, type: "text", audio: "../assets/audio/garden/papaya.mp3", correct: "PAPAYA", wrong: ["WATERMELON", "FLOWER", "LEAF"] },
//         { id: 15, type: "text", audio: "../assets/audio/garden/watermelon.mp3", correct: "WATERMELON", wrong: ["PAPAYA", "TREE", "SUN"] }
//     ],

//     // 4. TEMA ZOO
//     zoo: [
//         { id: 1, type: "image", image: "../assets/data/deer.jpg", audio: "../assets/audio/zoo/deer.mp3", correct: "DEER", wrong: ["LION", "TIGER", "ZEBRA"] },
//         { id: 2, type: "image", image: "../assets/data/lion.jpg", audio: "../assets/audio/zoo/lion.mp3", correct: "LION", wrong: ["TIGER", "BEAR", "MONKEY"] },
//         { id: 3, type: "image", image: "../assets/data/tiger.jpg", audio: "../assets/audio/zoo/tiger.mp3", correct: "TIGER", wrong: ["LION", "ZEBRA", "HORSE"] },
//         { id: 4, type: "image", image: "../assets/data/monkey.jpg", audio: "../assets/audio/zoo/monkey.mp3", correct: "MONKEY", wrong: ["FLAMINGO", "CAPYBARA", "BEAR"] },
//         { id: 5, type: "image", image: "../assets/data/flamingo.jpg", audio: "../assets/audio/zoo/flamingo.mp3", correct: "FLAMINGO", wrong: ["DEER", "MONKEY", "CAPYBARA"] },
//         { id: 6, type: "image", image: "../assets/data/capybara.jpg", audio: "../assets/audio/zoo/capybara.mp3", correct: "CAPYBARA", wrong: ["MONKEY", "FLAMINGO", "ZEBRA"] },
//         { id: 7, type: "image", image: "../assets/data/bear.jpg", audio: "../assets/audio/zoo/bear.mp3", correct: "BEAR", wrong: ["LION", "TIGER", "MONKEY"] },
//         { id: 8, type: "image", image: "../assets/data/zebra.jpg", audio: "../assets/audio/zoo/zebra.mp3", correct: "ZEBRA", wrong: ["HORSE", "DEER", "TIGER"] },
//         { id: 9, type: "image", image: "../assets/data/horse.jpg", audio: "../assets/audio/zoo/horse.mp3", correct: "HORSE", wrong: ["ZEBRA", "DEER", "LION"] },
//         { id: 10, type: "text", audio: "../assets/audio/zoo/giraffe.mp3", correct: "GIRAFFA", wrong: ["ELEPHANT", "CROCODILE", "SNAKE"] },
//         { id: 11, type: "text", audio: "../assets/audio/zoo/elephant.mp3", correct: "ELEPHANT", wrong: ["GIRAFFA", "CROCODILE", "TURTLE"] },
//         { id: 12, type: "text", audio: "../assets/audio/zoo/crocodile.mp3", correct: "CROCODILE", wrong: ["SNAKE", "TURTLE", "ELEPHANT"] },
//         { id: 13, type: "text", audio: "../assets/audio/zoo/snake.mp3", correct: "SNAKE", wrong: ["CROCODILE", "EAGLE", "TURTLE"] },
//         { id: 14, type: "text", audio: "../assets/audio/zoo/turtle.mp3", correct: "TURTLE", wrong: ["SNAKE", "CROCODILE", "ELEPHANT"] },
//         { id: 15, type: "text", audio: "../assets/audio/zoo/eagle.mp3", correct: "EAGLE", wrong: ["SNAKE", "GIRAFFA", "ELEPHANT"] }
//     ],

//     // 5. TEMA TAMAN
//     taman: [
//         { id: 1, type: "image", image: "../assets/data/pond.jpg", audio: "../assets/audio/park/pond.mp3", correct: "POND", wrong: ["FOUNTAIN", "STATUE", "PLAYGROUND"] },
//         { id: 2, type: "image", image: "../assets/data/fountain.jpg", audio: "../assets/audio/park/fountain.mp3", correct: "FOUNTAIN", wrong: ["POND", "STATUE", "BICYCLE"] },
//         { id: 3, type: "image", image: "../assets/data/playground.jpg", audio: "../assets/audio/park/playground.mp3", correct: "PLAYGROUND", wrong: ["POND", "FOUNTAIN", "SEESAW"] },
//         { id: 4, type: "image", image: "../assets/data/seesaw.jpg", audio: "../assets/audio/park/seesaw.mp3", correct: "SEESAW", wrong: ["SLIDE", "SWING", "BICYCLE"] },
//         { id: 5, type: "image", image: "../assets/data/statue.jpg", audio: "../assets/audio/park/statue.mp3", correct: "STATUE", wrong: ["POND", "FOUNTAIN", "BICYCLE"] },
//         { id: 6, type: "image", image: "../assets/data/bicycle.jpg", audio: "../assets/audio/park/bicycle.mp3", correct: "BICYCLE", wrong: ["SEESAW", "SLIDE", "SWING"] },
//         { id: 7, type: "text", audio: "../assets/audio/park/slide.mp3", correct: "SLIDE", wrong: ["SWING", "SEESAW", "PLAYGROUND"] },
//         { id: 8, type: "text", audio: "../assets/audio/park/swing.mp3", correct: "SWING", wrong: ["SLIDE", "SEESAW", "BICYCLE"] },
//         { id: 9, type: "text", audio: "../assets/audio/park/bird.mp3", correct: "BIRD", wrong: ["KITE", "GUITAR", "PEOPLE"] },
//         { id: 10, type: "text", audio: "../assets/audio/park/kite.mp3", correct: "KITE", wrong: ["BIRD", "GUITAR", "STROLLER"] },
//         { id: 11, type: "text", audio: "../assets/audio/park/people.mp3", correct: "PEOPLE", wrong: ["KIDS", "BIRD", "KITE"] },
//         { id: 12, type: "text", audio: "../assets/audio/park/kids.mp3", correct: "KIDS", wrong: ["PEOPLE", "STROLLER", "BIRD"] },
//         { id: 13, type: "text", audio: "../assets/audio/park/stroller.mp3", correct: "STROLLER", wrong: ["BICYCLE", "KIDS", "GUITAR"] },
//         { id: 14, type: "text", audio: "../assets/audio/park/bench.mp3", correct: "BENCH", wrong: ["BICYCLE", "STATUE", "POND"] },
//         { id: 15, type: "text", audio: "../assets/audio/park/guitar.mp3", correct: "GUITAR", wrong: ["KITE", "BIRD", "STROLLER"] }
//     ],

//     // 6. TEMA LAUT
//     sea: [
//         { id: 1, type: "image", image: "../assets/data/shrimp.jpg", audio: "../assets/audio/sea/shrimp.mp3", correct: "SHRIMP", wrong: ["CRAB", "SHARK", "WHALE"] },
//         { id: 2, type: "image", image: "../assets/data/crab.jpg", audio: "../assets/audio/sea/crab.mp3", correct: "CRAB", wrong: ["SHRIMP", "SHELL", "PEARL"] },
//         { id: 3, type: "image", image: "../assets/data/coral.jpg", audio: "../assets/audio/sea/coral.mp3", correct: "CORAL", wrong: ["SHELL", "SHARK", "WHALE"] },
//         { id: 4, type: "image", image: "../assets/data/shark.jpg", audio: "../assets/audio/sea/shark.mp3", correct: "SHARK", wrong: ["WHALE", "DOLPHIN", "SHRIMP"] },
//         { id: 5, type: "image", image: "../assets/data/whale.jpg", audio: "../assets/audio/sea/whale.mp3", correct: "WHALE", wrong: ["SHARK", "DOLPHIN", "CORAL"] },
//         { id: 6, type: "image", image: "../assets/data/dolphin.jpg", audio: "../assets/audio/sea/dolphin.mp3", correct: "DOLPHIN", wrong: ["WHALE", "SHARK", "CRAB"] },
//         { id: 7, type: "image", image: "../assets/data/shell.jpg", audio: "../assets/audio/sea/shell.mp3", correct: "SHELL", wrong: ["PEARL", "CORAL", "CRAB"] },
//         { id: 8, type: "image", image: "../assets/data/pearl.jpg", audio: "../assets/audio/sea/pearl.mp3", correct: "PEARL", wrong: ["SHELL", "CORAL", "SHRIMP"] },
//         { id: 9, type: "image", image: "../assets/data/octopus.jpg", audio: "../assets/audio/sea/octopus.mp3", correct: "OCTOPUS", wrong: ["SHARK", "WHALE", "DOLPHIN"] },
//         { id: 10, type: "text", audio: "../assets/audio/sea/anchor.mp3", correct: "ANCHOR", wrong: ["BEACH", "SQUID", "SPONGE"] },
//         { id: 11, type: "text", audio: "../assets/audio/sea/stingray.mp3", correct: "STINGRAY", wrong: ["SHARK", "JELLYFISH", "BEACH"] },
//         { id: 12, type: "text", audio: "../assets/audio/sea/sponge.mp3", correct: "SPONGE", wrong: ["CORAL", "ANCHOR", "SQUID"] },
//         { id: 13, type: "text", audio: "../assets/audio/sea/squid.mp3", correct: "SQUID", wrong: ["OCTOPUS", "JELLYFISH", "STINGRAY"] },
//         { id: 14, type: "text", audio: "../assets/audio/sea/jellyfish.mp3", correct: "JELLYFISH", wrong: ["STINGRAY", "SQUID", "SPONGE"] },
//         { id: 15, type: "text", audio: "../assets/audio/sea/beach.mp3", correct: "BEACH", wrong: ["ANCHOR", "PEARL", "SHELL"] }
//     ]
// };

// JS/data_soal.js
const databaseSoal = {

  // 1. TEMA KOTA
  kota: [
    { id: 1, type: "text", audio: "../assets/audio/kota/ambulance.mp3", correct: "AMBULANCE", wrong: ["HOSPITAL", "MOTORCYCLE", "BRIDGE"] },
    { id: 2, type: "text", audio: "../assets/audio/kota/hospital.mp3", correct: "HOSPITAL", wrong: ["CINEMA", "LIBRARY", "AMBULANCE"] },
    { id: 3, type: "text", audio: "../assets/audio/kota/motorcycle.mp3", correct: "MOTORCYCLE", wrong: ["TRAIN", "PLANE", "STREET"] },
    { id: 4, type: "text", audio: "../assets/audio/kota/bridge.mp3", correct: "BRIDGE", wrong: ["ROAD", "SIDEWALK", "CROSSWALK"] },
    { id: 5, type: "text", audio: "../assets/audio/kota/cinema.mp3", correct: "CINEMA", wrong: ["WATERPARK", "PLAYGROUND", "LIBRARY"] },
    { id: 6, type: "text", audio: "../assets/audio/kota/street.mp3", correct: "STREET", wrong: ["TRAFFIC", "CROSSWALK", "SIDEWALK"] },
    { id: 7, type: "text", audio: "../assets/audio/kota/sidewalk.mp3", correct: "SIDEWALK", wrong: ["ROAD", "BRIDGE", "STREET"] },
    { id: 8, type: "text", audio: "../assets/audio/kota/library.mp3", correct: "LIBRARY", wrong: ["HOSPITAL", "CINEMA", "SCHOOL"] },
    { id: 9, type: "text", audio: "../assets/audio/kota/road.mp3", correct: "ROAD", wrong: ["BRIDGE", "STREET", "SIDEWALK"] },
    { id: 10, type: "text", audio: "../assets/audio/kota/crosswalk.mp3", correct: "CROSSWALK", wrong: ["TRAFFIC", "ROAD", "SIDEWALK"] },
    { id: 11, type: "text", audio: "../assets/audio/kota/train.mp3", correct: "TRAIN", wrong: ["PLANE", "MOTORCYCLE", "AMBULANCE"] },
    { id: 12, type: "text", audio: "../assets/audio/kota/plane.mp3", correct: "PLANE", wrong: ["TRAIN", "MOTORCYCLE", "AMBULANCE"] },
    { id: 13, type: "text", audio: "../assets/audio/kota/traffic.mp3", correct: "TRAFFIC", wrong: ["STREET", "ROAD", "CROSSWALK"] },
    { id: 14, type: "text", audio: "../assets/audio/kota/waterpark.mp3", correct: "WATERPARK", wrong: ["PLAYGROUND", "CINEMA", "LIBRARY"] },
    { id: 15, type: "text", audio: "../assets/audio/kota/playground.mp3", correct: "PLAYGROUND", wrong: ["WATERPARK", "HOSPITAL", "CINEMA"] }
  ],

  // 2. TEMA RUMAH
  rumah: [
    { id: 1, type: "text", audio: "../assets/audio/home/bedroom.mp3", correct: "BEDROOM", wrong: ["KITCHEN", "BATHROOM", "GARAGE"] },
    { id: 2, type: "text", audio: "../assets/audio/home/pantry.mp3", correct: "PANTRY", wrong: ["ATTIC", "BASEMENT", "TERRACE"] },
    { id: 3, type: "text", audio: "../assets/audio/home/spoon.mp3", correct: "SPOON", wrong: ["KNIFE", "SOFA", "FAN"] },
    { id: 4, type: "text", audio: "../assets/audio/home/knife.mp3", correct: "KNIFE", wrong: ["SPOON", "SUITCASE", "SOFA"] },
    { id: 5, type: "text", audio: "../assets/audio/home/kitchen.mp3", correct: "KITCHEN", wrong: ["BEDROOM", "BATHROOM", "GARAGE"] },
    { id: 6, type: "text", audio: "../assets/audio/home/bathroom.mp3", correct: "BATHROOM", wrong: ["BEDROOM", "KITCHEN", "BASEMENT"] },
    { id: 7, type: "text", audio: "../assets/audio/home/fan.mp3", correct: "FAN", wrong: ["SOFA", "KNIFE", "SPOON"] },
    { id: 8, type: "text", audio: "../assets/audio/home/sofa.mp3", correct: "SOFA", wrong: ["FAN", "SUITCASE", "BEDROOM"] },
    { id: 9, type: "text", audio: "../assets/audio/home/suitcase.mp3", correct: "SUITCASE", wrong: ["SOFA", "FAN", "KNIFE"] },
    { id: 10, type: "text", audio: "../assets/audio/home/garage.mp3", correct: "GARAGE", wrong: ["CAR", "TERRACE", "STAIRCASE"] },
    { id: 11, type: "text", audio: "../assets/audio/home/terrace.mp3", correct: "TERRACE", wrong: ["GARAGE", "ATTIC", "BASEMENT"] },
    { id: 12, type: "text", audio: "../assets/audio/home/staircase.mp3", correct: "STAIRCASE", wrong: ["BASEMENT", "ATTIC", "TERRACE"] },
    { id: 13, type: "text", audio: "../assets/audio/home/basement.mp3", correct: "BASEMENT", wrong: ["ATTIC", "TERRACE", "GARAGE"] },
    { id: 14, type: "text", audio: "../assets/audio/home/attic.mp3", correct: "ATTIC", wrong: ["BASEMENT", "TERRACE", "STAIRCASE"] },
    { id: 15, type: "text", audio: "../assets/audio/home/car.mp3", correct: "CAR", wrong: ["GARAGE", "FAN", "SOFA"] }
  ],

  // 3. TEMA KEBUN
  kebun: [
    { id: 1, type: "text", audio: "../assets/audio/garden/flower.mp3", correct: "FLOWER", wrong: ["TREE", "LEAF", "BIRD"] },
    { id: 2, type: "text", audio: "../assets/audio/garden/fence.mp3", correct: "FENCE", wrong: ["SAND", "GLASS", "TREE"] },
    { id: 3, type: "text", audio: "../assets/audio/garden/bird.mp3", correct: "BIRD", wrong: ["BUTTERFLY", "INSECT", "WORM"] },
    { id: 4, type: "text", audio: "../assets/audio/garden/butterfly.mp3", correct: "BUTTERFLY", wrong: ["BIRD", "INSECT", "WORM"] },
    { id: 5, type: "text", audio: "../assets/audio/garden/insect.mp3", correct: "INSECT", wrong: ["WORM", "BUTTERFLY", "BIRD"] },
    { id: 6, type: "text", audio: "../assets/audio/garden/worm.mp3", correct: "WORM", wrong: ["INSECT", "BUTTERFLY", "BIRD"] },
    { id: 7, type: "text", audio: "../assets/audio/garden/sun.mp3", correct: "SUN", wrong: ["RAIN", "CLOUD", "SAND"] },
    { id: 8, type: "text", audio: "../assets/audio/garden/rain.mp3", correct: "RAIN", wrong: ["SUN", "CLOUD", "LEAF"] },
    { id: 9, type: "text", audio: "../assets/audio/garden/cloud.mp3", correct: "CLOUD", wrong: ["SUN", "RAIN", "SAND"] },
    { id: 10, type: "text", audio: "../assets/audio/garden/tree.mp3", correct: "TREE", wrong: ["FLOWER", "LEAF", "FENCE"] },
    { id: 11, type: "text", audio: "../assets/audio/garden/leaf.mp3", correct: "LEAF", wrong: ["TREE", "FLOWER", "WORM"] },
    { id: 12, type: "text", audio: "../assets/audio/garden/sand.mp3", correct: "SAND", wrong: ["CLOUD", "GLASS", "RAIN"] },
    { id: 13, type: "text", audio: "../assets/audio/garden/glass.mp3", correct: "GLASS", wrong: ["SAND", "SUN", "FENCE"] },
    { id: 14, type: "text", audio: "../assets/audio/garden/papaya.mp3", correct: "PAPAYA", wrong: ["WATERMELON", "FLOWER", "LEAF"] },
    { id: 15, type: "text", audio: "../assets/audio/garden/watermelon.mp3", correct: "WATERMELON", wrong: ["PAPAYA", "TREE", "SUN"] }
  ],

  // 4. TEMA ZOO
  zoo: [
    { id: 1, type: "text", audio: "../assets/audio/zoo/deer.mp3", correct: "DEER", wrong: ["LION", "TIGER", "ZEBRA"] },
    { id: 2, type: "text", audio: "../assets/audio/zoo/lion.mp3", correct: "LION", wrong: ["TIGER", "BEAR", "MONKEY"] },
    { id: 3, type: "text", audio: "../assets/audio/zoo/tiger.mp3", correct: "TIGER", wrong: ["LION", "ZEBRA", "HORSE"] },
    { id: 4, type: "text", audio: "../assets/audio/zoo/monkey.mp3", correct: "MONKEY", wrong: ["FLAMINGO", "CAPYBARA", "BEAR"] },
    { id: 5, type: "text", audio: "../assets/audio/zoo/flamingo.mp3", correct: "FLAMINGO", wrong: ["DEER", "MONKEY", "CAPYBARA"] },
    { id: 6, type: "text", audio: "../assets/audio/zoo/capybara.mp3", correct: "CAPYBARA", wrong: ["MONKEY", "FLAMINGO", "ZEBRA"] },
    { id: 7, type: "text", audio: "../assets/audio/zoo/bear.mp3", correct: "BEAR", wrong: ["LION", "TIGER", "MONKEY"] },
    { id: 8, type: "text", audio: "../assets/audio/zoo/zebra.mp3", correct: "ZEBRA", wrong: ["HORSE", "DEER", "TIGER"] },
    { id: 9, type: "text", audio: "../assets/audio/zoo/horse.mp3", correct: "HORSE", wrong: ["ZEBRA", "DEER", "LION"] },
    { id: 10, type: "text", audio: "../assets/audio/zoo/giraffe.mp3", correct: "GIRAFFA", wrong: ["ELEPHANT", "CROCODILE", "SNAKE"] },
    { id: 11, type: "text", audio: "../assets/audio/zoo/elephant.mp3", correct: "ELEPHANT", wrong: ["GIRAFFA", "CROCODILE", "TURTLE"] },
    { id: 12, type: "text", audio: "../assets/audio/zoo/crocodile.mp3", correct: "CROCODILE", wrong: ["SNAKE", "TURTLE", "ELEPHANT"] },
    { id: 13, type: "text", audio: "../assets/audio/zoo/snake.mp3", correct: "SNAKE", wrong: ["CROCODILE", "EAGLE", "TURTLE"] },
    { id: 14, type: "text", audio: "../assets/audio/zoo/turtle.mp3", correct: "TURTLE", wrong: ["SNAKE", "CROCODILE", "ELEPHANT"] },
    { id: 15, type: "text", audio: "../assets/audio/zoo/eagle.mp3", correct: "EAGLE", wrong: ["SNAKE", "GIRAFFA", "ELEPHANT"] }
  ],

  // 5. TEMA TAMAN
  taman: [
    { id: 1, type: "text", audio: "../assets/audio/park/pond.mp3", correct: "POND", wrong: ["FOUNTAIN", "STATUE", "PLAYGROUND"] },
    { id: 2, type: "text", audio: "../assets/audio/park/fountain.mp3", correct: "FOUNTAIN", wrong: ["POND", "STATUE", "BICYCLE"] },
    { id: 3, type: "text", audio: "../assets/audio/park/playground.mp3", correct: "PLAYGROUND", wrong: ["POND", "FOUNTAIN", "SEESAW"] },
    { id: 4, type: "text", audio: "../assets/audio/park/seesaw.mp3", correct: "SEESAW", wrong: ["SLIDE", "SWING", "BICYCLE"] },
    { id: 5, type: "text", audio: "../assets/audio/park/statue.mp3", correct: "STATUE", wrong: ["POND", "FOUNTAIN", "BICYCLE"] },
    { id: 6, type: "text", audio: "../assets/audio/park/bicycle.mp3", correct: "BICYCLE", wrong: ["SEESAW", "SLIDE", "SWING"] },
    { id: 7, type: "text", audio: "../assets/audio/park/slide.mp3", correct: "SLIDE", wrong: ["SWING", "SEESAW", "PLAYGROUND"] },
    { id: 8, type: "text", audio: "../assets/audio/park/swing.mp3", correct: "SWING", wrong: ["SLIDE", "SEESAW", "BICYCLE"] },
    { id: 9, type: "text", audio: "../assets/audio/park/bird.mp3", correct: "BIRD", wrong: ["KITE", "GUITAR", "PEOPLE"] },
    { id: 10, type: "text", audio: "../assets/audio/park/kite.mp3", correct: "KITE", wrong: ["BIRD", "GUITAR", "STROLLER"] },
    { id: 11, type: "text", audio: "../assets/audio/park/people.mp3", correct: "PEOPLE", wrong: ["KIDS", "BIRD", "KITE"] },
    { id: 12, type: "text", audio: "../assets/audio/park/kids.mp3", correct: "KIDS", wrong: ["PEOPLE", "STROLLER", "BIRD"] },
    { id: 13, type: "text", audio: "../assets/audio/park/stroller.mp3", correct: "STROLLER", wrong: ["BICYCLE", "KIDS", "GUITAR"] },
    { id: 14, type: "text", audio: "../assets/audio/park/bench.mp3", correct: "BENCH", wrong: ["BICYCLE", "STATUE", "POND"] },
    { id: 15, type: "text", audio: "../assets/audio/park/guitar.mp3", correct: "GUITAR", wrong: ["KITE", "BIRD", "STROLLER"] }
  ],

  // 6. TEMA LAUT
  sea: [
    { id: 1, type: "text", audio: "../assets/audio/sea/shrimp.mp3", correct: "SHRIMP", wrong: ["CRAB", "SHARK", "WHALE"] },
    { id: 2, type: "text", audio: "../assets/audio/sea/crab.mp3", correct: "CRAB", wrong: ["SHRIMP", "SHELL", "PEARL"] },
    { id: 3, type: "text", audio: "../assets/audio/sea/coral.mp3", correct: "CORAL", wrong: ["SHELL", "SHARK", "WHALE"] },
    { id: 4, type: "text", audio: "../assets/audio/sea/shark.mp3", correct: "SHARK", wrong: ["WHALE", "DOLPHIN", "SHRIMP"] },
    { id: 5, type: "text", audio: "../assets/audio/sea/whale.mp3", correct: "WHALE", wrong: ["SHARK", "DOLPHIN", "CORAL"] },
    { id: 6, type: "text", audio: "../assets/audio/sea/dolphin.mp3", correct: "DOLPHIN", wrong: ["WHALE", "SHARK", "CRAB"] },
    { id: 7, type: "text", audio: "../assets/audio/sea/shell.mp3", correct: "SHELL", wrong: ["PEARL", "CORAL", "CRAB"] },
    { id: 8, type: "text", audio: "../assets/audio/sea/pearl.mp3", correct: "PEARL", wrong: ["SHELL", "CORAL", "SHRIMP"] },
    { id: 9, type: "text", audio: "../assets/audio/sea/octopus.mp3", correct: "OCTOPUS", wrong: ["SHARK", "WHALE", "DOLPHIN"] },
    { id: 10, type: "text", audio: "../assets/audio/sea/anchor.mp3", correct: "ANCHOR", wrong: ["BEACH", "SQUID", "SPONGE"] },
    { id: 11, type: "text", audio: "../assets/audio/sea/stingray.mp3", correct: "STINGRAY", wrong: ["SHARK", "JELLYFISH", "BEACH"] },
    { id: 12, type: "text", audio: "../assets/audio/sea/sponge.mp3", correct: "SPONGE", wrong: ["CORAL", "ANCHOR", "SQUID"] },
    { id: 13, type: "text", audio: "../assets/audio/sea/squid.mp3", correct: "SQUID", wrong: ["OCTOPUS", "JELLYFISH", "STINGRAY"] },
    { id: 14, type: "text", audio: "../assets/audio/sea/jellyfish.mp3", correct: "JELLYFISH", wrong: ["STINGRAY", "SQUID", "SPONGE"] },
    { id: 15, type: "text", audio: "../assets/audio/sea/beach.mp3", correct: "BEACH", wrong: ["ANCHOR", "PEARL", "SHELL"] }
  ]

};
