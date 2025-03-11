// /* eslint-disable @typescript-eslint/no-require-imports */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// const { PrismaClient } = require("@prisma/client");

// const prismaClient = new PrismaClient();

// const main = async () => {
//   await prismaClient.$transaction(async (tx: any) => {
//     await tx.restaurant.deleteMany();

//     // FSW Donalds
//     const donalds = await tx.restaurant.create({
//       data: {
//         name: "FSW Donalds",
//         slug: "fsw-donalds",
//         description: "O melhor fast food do mundo",
//         avatarImageUrl:
//           "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
//         coverImageUrl:
//           "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
//       },
//     });

//     // Categorias do FSW Donalds
//     const donaldsCombosCategory = await tx.menuCategory.create({
//       data: {
//         name: "Combos",
//         restaurantId: donalds.id,
//       },
//     });

//     const donaldsBurgersCategory = await tx.menuCategory.create({
//       data: {
//         name: "Hambúrgueres",
//         restaurantId: donalds.id,
//       },
//     });

//     const donaldsSidesCategory = await tx.menuCategory.create({
//       data: {
//         name: "Acompanhamentos",
//         restaurantId: donalds.id,
//       },
//     });

//     const donaldsDessertsCategory = await tx.menuCategory.create({
//       data: {
//         name: "Sobremesas",
//         restaurantId: donalds.id,
//       },
//     });

//     const donaldsDrinksCategory = await tx.menuCategory.create({
//       data: {
//         name: "Bebidas",
//         restaurantId: donalds.id,
//       },
//     });

//     // Produtos do FSW Donalds
//     await tx.product.createMany({
//       data: [
//         // Combos
//         {
//           name: "McOferta Média Big Mac Duplo",
//           description:
//             "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergelim, acompanhamento e bebida.",
//           price: 39.9,
//           imageUrl:
//             "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
//           menuCategoryId: donaldsCombosCategory.id,
//           restaurantId: donalds.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Hambúrguer de carne 100% bovina",
//             "Alface americana",
//             "Queijo fatiado sabor cheddar",
//             "Molho especial",
//             "Cebola",
//             "Picles",
//           ],
//         },
//         {
//           name: "Novo Brabo Melt Onion Rings",
//           description:
//             "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
//           price: 41.5,
//           imageUrl:
//             "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
//           menuCategoryId: donaldsCombosCategory.id,
//           restaurantId: donalds.id,
//           ingredients: [
//             "Pão tipo brioche",
//             "Hambúrguer de carne 100% bovina",
//             "Méquinese",
//             "Maionese especial com sabor de carne defumada",
//             "Onion rings",
//             "Fatias de bacon",
//             "Queijo processado sabor cheddar",
//             "Molho lácteo com queijo tipo cheddar",
//           ],
//         },

//         // Hambúrgueres
//         {
//           name: "Big Mac",
//           description:
//             "Dois hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergelim.",
//           price: 29.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/big-mac.jpg",
//           menuCategoryId: donaldsBurgersCategory.id,
//           restaurantId: donalds.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Hambúrguer de carne 100% bovina",
//             "Alface americana",
//             "Queijo fatiado sabor cheddar",
//             "Molho especial",
//             "Cebola",
//             "Picles",
//           ],
//         },
//         {
//           name: "Quarterão com Queijo",
//           description:
//             "Um hambúrguer de carne 100% bovina, queijo, picles, cebola, ketchup e mostarda no pão com gergelim.",
//           price: 24.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/quarterao-queijo.jpg",
//           menuCategoryId: donaldsBurgersCategory.id,
//           restaurantId: donalds.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Hambúrguer de carne 100% bovina",
//             "Queijo",
//             "Picles",
//             "Cebola",
//             "Ketchup",
//             "Mostarda",
//           ],
//         },

//         // Acompanhamentos
//         {
//           name: "Batata Frita Média",
//           description: "Batatas fritas crocantes e sequinhas.",
//           price: 9.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-media.jpg",
//           menuCategoryId: donaldsSidesCategory.id,
//           restaurantId: donalds.id,
//           ingredients: ["Batata", "Sal"],
//         },
//         {
//           name: "Nuggets (6 unidades)",
//           description: "Deliciosos nuggets de frango crocantes.",
//           price: 12.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/nuggets.jpg",
//           menuCategoryId: donaldsSidesCategory.id,
//           restaurantId: donalds.id,
//           ingredients: ["Frango empanado"],
//         },

//         // Sobremesas
//         {
//           name: "McFlurry Oreo",
//           description: "Sorvete de baunilha com pedaços de Oreo.",
//           price: 14.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/mcflurry-oreo.jpg",
//           menuCategoryId: donaldsDessertsCategory.id,
//           restaurantId: donalds.id,
//           ingredients: ["Sorvete de baunilha", "Pedaços de Oreo"],
//         },
//         {
//           name: "Torta de Maçã",
//           description: "Torta de maçã quentinha e crocante.",
//           price: 8.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/torta-maca.jpg",
//           menuCategoryId: donaldsDessertsCategory.id,
//           restaurantId: donalds.id,
//           ingredients: ["Maçã", "Massa folhada"],
//         },

//         // Bebidas
//         {
//           name: "Coca-Cola 500ml",
//           description: "Refrigerante Coca-Cola gelado.",
//           price: 7.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/coca-cola.jpg",
//           menuCategoryId: donaldsDrinksCategory.id,
//           restaurantId: donalds.id,
//           ingredients: [],
//         },
//         {
//           name: "Suco de Laranja Natural",
//           description: "Suco de laranja fresco e natural.",
//           price: 10.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/suco-laranja.jpg",
//           menuCategoryId: donaldsDrinksCategory.id,
//           restaurantId: donalds.id,
//           ingredients: ["Laranja"],
//         },
//       ],
//     });

//     // FSW Burger King
//     const burgerKing = await tx.restaurant.create({
//       data: {
//         name: "FSW Burger King",
//         slug: "fsw-burger-king",
//         description: "O sabor flame-grilled que você ama, agora em FSW!",
//         avatarImageUrl: "https://u9a6wmr3as.ufs.sh/f/burger-king-avatar.jpg",
//         coverImageUrl: "https://u9a6wmr3as.ufs.sh/f/burger-king-cover.jpg",
//       },
//     });

//     // Categorias do FSW Burger King
//     const bkCombosCategory = await tx.menuCategory.create({
//       data: {
//         name: "Combos",
//         restaurantId: burgerKing.id,
//       },
//     });

//     const bkBurgersCategory = await tx.menuCategory.create({
//       data: {
//         name: "Hambúrgueres",
//         restaurantId: burgerKing.id,
//       },
//     });

//     const bkSidesCategory = await tx.menuCategory.create({
//       data: {
//         name: "Acompanhamentos",
//         restaurantId: burgerKing.id,
//       },
//     });

//     const bkDessertsCategory = await tx.menuCategory.create({
//       data: {
//         name: "Sobremesas",
//         restaurantId: burgerKing.id,
//       },
//     });

//     const bkDrinksCategory = await tx.menuCategory.create({
//       data: {
//         name: "Bebidas",
//         restaurantId: burgerKing.id,
//       },
//     });

//     // Produtos do FSW Burger King
//     await tx.product.createMany({
//       data: [
//         // Combos
//         {
//           name: "Whopper Duplo",
//           description:
//             "Dois suculentos hambúrgueres flame-grilled, alface, tomate, maionese, ketchup, picles e cebola no pão com gergelim.",
//           price: 35.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/whopper-duplo.jpg",
//           menuCategoryId: bkCombosCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Dois hambúrgueres flame-grilled",
//             "Alface",
//             "Tomate",
//             "Maionese",
//             "Ketchup",
//             "Picles",
//             "Cebola",
//           ],
//         },
//         {
//           name: "Chicken Jr.",
//           description:
//             "Um delicioso sanduíche de frango empanado, alface e maionese no pão tipo brioche.",
//           price: 12.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/chicken-jr.jpg",
//           menuCategoryId: bkCombosCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [
//             "Pão tipo brioche",
//             "Frango empanado",
//             "Alface",
//             "Maionese",
//           ],
//         },

//         // Hambúrgueres
//         {
//           name: "Whopper",
//           description:
//             "Um hambúrguer flame-grilled, alface, tomate, maionese, ketchup, picles e cebola no pão com gergelim.",
//           price: 25.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/whopper.jpg",
//           menuCategoryId: bkBurgersCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Hambúrguer flame-grilled",
//             "Alface",
//             "Tomate",
//             "Maionese",
//             "Ketchup",
//             "Picles",
//             "Cebola",
//           ],
//         },
//         {
//           name: "Cheeseburger",
//           description:
//             "Um hambúrguer flame-grilled, queijo, picles, ketchup e mostarda no pão com gergelim.",
//           price: 10.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/cheeseburger.jpg",
//           menuCategoryId: bkBurgersCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Hambúrguer flame-grilled",
//             "Queijo",
//             "Picles",
//             "Ketchup",
//             "Mostarda",
//           ],
//         },

//         // Acompanhamentos
//         {
//           name: "Batata Frita Grande",
//           description: "Batatas fritas crocantes e sequinhas.",
//           price: 12.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-grande.jpg",
//           menuCategoryId: bkSidesCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: ["Batata", "Sal"],
//         },
//         {
//           name: "Onion Rings",
//           description: "Anéis de cebola empanados e crocantes.",
//           price: 14.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/onion-rings.jpg",
//           menuCategoryId: bkSidesCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: ["Cebola", "Massa empanada"],
//         },

//         // Sobremesas
//         {
//           name: "Sundae de Chocolate",
//           description: "Sorvete de baunilha coberto com calda de chocolate.",
//           price: 9.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/sundae-chocolate.jpg",
//           menuCategoryId: bkDessertsCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: ["Sorvete de baunilha", "Calda de chocolate"],
//         },
//         {
//           name: "Torta de Morango",
//           description: "Torta de morango com creme.",
//           price: 11.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/torta-morango.jpg",
//           menuCategoryId: bkDessertsCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: ["Morango", "Creme", "Massa"],
//         },

//         // Bebidas
//         {
//           name: "Guaraná Antarctica 500ml",
//           description: "Refrigerante Guaraná Antarctica gelado.",
//           price: 7.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/guarana.jpg",
//           menuCategoryId: bkDrinksCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [],
//         },
//         {
//           name: "Água Mineral 500ml",
//           description: "Água mineral sem gás.",
//           price: 4.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/agua-mineral.jpg",
//           menuCategoryId: bkDrinksCategory.id,
//           restaurantId: burgerKing.id,
//           ingredients: [],
//         },
//       ],
//     });

//     // FSW Subway
//     const subway = await tx.restaurant.create({
//       data: {
//         name: "FSW Subway",
//         slug: "fsw-subway",
//         description: "Coma fresco, coma Subway!",
//         avatarImageUrl: "https://u9a6wmr3as.ufs.sh/f/subway-avatar.jpg",
//         coverImageUrl: "https://u9a6wmr3as.ufs.sh/f/subway-cover.jpg",
//       },
//     });

//     // Categorias do FSW Subway
//     const subwaySandwichesCategory = await tx.menuCategory.create({
//       data: {
//         name: "Sanduíches",
//         restaurantId: subway.id,
//       },
//     });

//     const subwaySaladsCategory = await tx.menuCategory.create({
//       data: {
//         name: "Saladas",
//         restaurantId: subway.id,
//       },
//     });

//     const subwaySidesCategory = await tx.menuCategory.create({
//       data: {
//         name: "Acompanhamentos",
//         restaurantId: subway.id,
//       },
//     });

//     const subwayDessertsCategory = await tx.menuCategory.create({
//       data: {
//         name: "Sobremesas",
//         restaurantId: subway.id,
//       },
//     });

//     const subwayDrinksCategory = await tx.menuCategory.create({
//       data: {
//         name: "Bebidas",
//         restaurantId: subway.id,
//       },
//     });

//     // Produtos do FSW Subway
//     await tx.product.createMany({
//       data: [
//         // Sanduíches do FSW Subway
//         {
//           name: "Subway Club",
//           description:
//             "Peru, presunto, carne bovina, alface, tomate, cebola, pimentão verde e azeitonas pretas.",
//           price: 28.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/subway-club.jpg",
//           menuCategoryId: subwaySandwichesCategory.id,
//           restaurantId: subway.id,
//           ingredients: [
//             "Pão integral",
//             "Peru",
//             "Presunto",
//             "Carne bovina",
//             "Alface",
//             "Tomate",
//             "Cebola",
//             "Pimentão verde",
//             "Azeitonas pretas",
//           ],
//         },
//         {
//           name: "Frango Teriyaki",
//           description:
//             "Frango grelhado com molho teriyaki, alface, tomate, cebola e pimentão verde.",
//           price: 24.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/frango-teriyaki.jpg",
//           menuCategoryId: subwaySandwichesCategory.id,
//           restaurantId: subway.id,
//           ingredients: [
//             "Pão italiano",
//             "Frango grelhado",
//             "Molho teriyaki",
//             "Alface",
//             "Tomate",
//             "Cebola",
//             "Pimentão verde",
//           ],
//         },
//         {
//           name: "Vegetariano",
//           description:
//             "Pão integral com queijo, alface, tomate, pepino, pimentão, azeitonas e molho especial.",
//           price: 19.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/vegetariano.jpg",
//           menuCategoryId: subwaySandwichesCategory.id,
//           restaurantId: subway.id,
//           ingredients: [
//             "Pão integral",
//             "Queijo",
//             "Alface",
//             "Tomate",
//             "Pepino",
//             "Pimentão",
//             "Azeitonas",
//             "Molho especial",
//           ],
//         },

//         // Saladas
//         {
//           name: "Salada de Frango Grelhado",
//           description:
//             "Mix de folhas, frango grelhado, tomate, pepino, cebola roxa e molho de mostarda e mel.",
//           price: 22.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-frango.jpg",
//           menuCategoryId: subwaySaladsCategory.id,
//           restaurantId: subway.id,
//           ingredients: [
//             "Mix de folhas",
//             "Frango grelhado",
//             "Tomate",
//             "Pepino",
//             "Cebola roxa",
//             "Molho de mostarda e mel",
//           ],
//         },
//         {
//           name: "Salada Vegana",
//           description:
//             "Mix de folhas, tomate, pepino, cenoura ralada, pimentão e molho de ervas.",
//           price: 18.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-vegana.jpg",
//           menuCategoryId: subwaySaladsCategory.id,
//           restaurantId: subway.id,
//           ingredients: [
//             "Mix de folhas",
//             "Tomate",
//             "Pepino",
//             "Cenoura ralada",
//             "Pimentão",
//             "Molho de ervas",
//           ],
//         },

//         // Acompanhamentos
//         {
//           name: "Cookie de Chocolate",
//           description: "Cookie macio e recheado com gotas de chocolate.",
//           price: 6.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/cookie-chocolate.jpg",
//           menuCategoryId: subwaySidesCategory.id,
//           restaurantId: subway.id,
//           ingredients: ["Chocolate", "Massa de cookie"],
//         },
//         {
//           name: "Batata Doce Assada",
//           description: "Porção de batata doce assada com canela.",
//           price: 9.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-doce.jpg",
//           menuCategoryId: subwaySidesCategory.id,
//           restaurantId: subway.id,
//           ingredients: ["Batata doce", "Canela"],
//         },

//         // Sobremesas
//         {
//           name: "Brownie de Chocolate",
//           description: "Brownie macio e recheado com chocolate.",
//           price: 8.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/brownie.jpg",
//           menuCategoryId: subwayDessertsCategory.id,
//           restaurantId: subway.id,
//           ingredients: ["Chocolate", "Massa de brownie"],
//         },
//         {
//           name: "Torta de Limão",
//           description: "Torta de limão com massa crocante.",
//           price: 10.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/torta-limao.jpg",
//           menuCategoryId: subwayDessertsCategory.id,
//           restaurantId: subway.id,
//           ingredients: ["Limão", "Massa crocante"],
//         },

//         // Bebidas
//         {
//           name: "Refrigerante 500ml",
//           description: "Refrigerante gelado de sua escolha.",
//           price: 7.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/refrigerante.jpg",
//           menuCategoryId: subwayDrinksCategory.id,
//           restaurantId: subway.id,
//           ingredients: [],
//         },
//         {
//           name: "Suco Natural 500ml",
//           description: "Suco natural de laranja ou abacaxi.",
//           price: 9.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/suco-natural.jpg",
//           menuCategoryId: subwayDrinksCategory.id,
//           restaurantId: subway.id,
//           ingredients: ["Laranja ou abacaxi"],
//         },
//       ],
//     });

//     // FSW Bob's
//     const bobs = await tx.restaurant.create({
//       data: {
//         name: "FSW Bob's",
//         slug: "fsw-bobs",
//         description: "O sabor que você conhece e ama!",
//         avatarImageUrl: "https://u9a6wmr3as.ufs.sh/f/bobs-avatar.jpg",
//         coverImageUrl: "https://u9a6wmr3as.ufs.sh/f/bobs-cover.jpg",
//       },
//     });

//     // Categorias do FSW Bob's
//     const bobsBurgersCategory = await tx.menuCategory.create({
//       data: {
//         name: "Hambúrgueres",
//         restaurantId: bobs.id,
//       },
//     });

//     const bobsSidesCategory = await tx.menuCategory.create({
//       data: {
//         name: "Acompanhamentos",
//         restaurantId: bobs.id,
//       },
//     });

//     const bobsDessertsCategory = await tx.menuCategory.create({
//       data: {
//         name: "Sobremesas",
//         restaurantId: bobs.id,
//       },
//     });

//     const bobsDrinksCategory = await tx.menuCategory.create({
//       data: {
//         name: "Bebidas",
//         restaurantId: bobs.id,
//       },
//     });

//     // Produtos do FSW Bob's
//     await tx.product.createMany({
//       data: [
//         // Hambúrgueres
//         {
//           name: "Big Bob",
//           description:
//             "Dois hambúrgueres, queijo, alface, tomate, cebola, picles e molho especial no pão com gergelim.",
//           price: 29.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/big-bob.jpg",
//           menuCategoryId: bobsBurgersCategory.id,
//           restaurantId: bobs.id,
//           ingredients: [
//             "Pão com gergelim",
//             "Dois hambúrgueres",
//             "Queijo",
//             "Alface",
//             "Tomate",
//             "Cebola",
//             "Picles",
//             "Molho especial",
//           ],
//         },
//         {
//           name: "Chicken Supreme",
//           description:
//             "Frango empanado, queijo, alface, tomate e maionese no pão tipo brioche.",
//           price: 22.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/chicken-supreme.jpg",
//           menuCategoryId: bobsBurgersCategory.id,
//           restaurantId: bobs.id,
//           ingredients: [
//             "Pão tipo brioche",
//             "Frango empanado",
//             "Queijo",
//             "Alface",
//             "Tomate",
//             "Maionese",
//           ],
//         },

//         // Acompanhamentos
//         {
//           name: "Batata Frita Média",
//           description: "Batatas fritas crocantes e sequinhas.",
//           price: 9.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-media.jpg",
//           menuCategoryId: bobsSidesCategory.id,
//           restaurantId: bobs.id,
//           ingredients: ["Batata", "Sal"],
//         },
//         {
//           name: "Onion Rings",
//           description: "Anéis de cebola empanados e crocantes.",
//           price: 12.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/onion-rings.jpg",
//           menuCategoryId: bobsSidesCategory.id,
//           restaurantId: bobs.id,
//           ingredients: ["Cebola", "Massa empanada"],
//         },

//         // Sobremesas
//         {
//           name: "Milkshake de Chocolate",
//           description: "Milkshake cremoso de chocolate.",
//           price: 14.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/milkshake-chocolate.jpg",
//           menuCategoryId: bobsDessertsCategory.id,
//           restaurantId: bobs.id,
//           ingredients: ["Chocolate", "Sorvete", "Leite"],
//         },
//         {
//           name: "Casquinha de Baunilha",
//           description: "Casquinha de sorvete sabor baunilha.",
//           price: 5.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/casquinha-baunilha.jpg",
//           menuCategoryId: bobsDessertsCategory.id,
//           restaurantId: bobs.id,
//           ingredients: ["Sorvete de baunilha"],
//         },

//         // Bebidas
//         {
//           name: "Coca-Cola 500ml",
//           description: "Refrigerante Coca-Cola gelado.",
//           price: 7.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/coca-cola.jpg",
//           menuCategoryId: bobsDrinksCategory.id,
//           restaurantId: bobs.id,
//           ingredients: [],
//         },
//         {
//           name: "Água Mineral 500ml",
//           description: "Água mineral sem gás.",
//           price: 4.9,
//           imageUrl: "https://u9a6wmr3as.ufs.sh/f/agua-mineral.jpg",
//           menuCategoryId: bobsDrinksCategory.id,
//           restaurantId: bobs.id,
//           ingredients: [],
//         },
//       ],
//     });
//   });
// };

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prismaClient.$disconnect();
//   });

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.restaurant.deleteMany();
    const restaurant = await tx.restaurant.create({
      data: {
        name: "FSW Donalds",
        slug: "fsw-donalds",
        description: "O melhor fast food do mundo",
        avatarImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
        coverImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
      },
    });
    const combosCategory = await tx.menuCategory.create({
      data: {
        name: "Combos",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
        },
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
        },
      ],
    });
    const hamburguersCategory = await tx.menuCategory.create({
      data: {
        name: "Lanches",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Big Mac",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Duplo Quarterão",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McMelt",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McNífico Bacon",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const frenchFriesCategory = await tx.menuCategory.create({
      data: {
        name: "Fritas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Fritas Grande",
          description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
          ingredients: [],
          price: 10.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fritas Média",
          description:
            "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
          ingredients: [],
          price: 9.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fritas Pequena",
          description:
            "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const drinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const desertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Casquinha de Baunilha",
          description: "Casquinha de sorvete sabor baunilha.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Casquinha de Mista",
          description: "Casquinha de sorvete sabor baunilha e chocolate.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
