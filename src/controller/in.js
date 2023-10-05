// const cart = await Cart.aggregate([
//     { $match: { _id: cartObjectId } },
//     {
//         $lookup: {
//             from: "products", // Replace 'products' with the actual name of the Products collection
//             localField: "items.product",
//             foreignField: "_id",
//             as: "itemsData",
//         },
//     },
//     {
//         $addFields: {
//             items: {
//                 $map: {
//                     input: "$items",
//                     as: "item",
//                     in: {
//                         $mergeObjects: [
//                             "$$item",
//                             {
//                                 $arrayElemAt: [
//                                     {
//                                         $filter: {
//                                             input: "$itemsData",
//                                             cond: {
//                                                 $eq: [
//                                                     "$$this._id",
//                                                     "$$item.product",
//                                                 ],
//                                             },
//                                         },
//                                     },
//                                     0,
//                                 ],
//                             },
//                         ],
//                     },
//                 },
//             },
//         },
//     },

//     {
//         $project: {
//             itemsData: 0,
//             "items.product": 0,
//             "items.description": 0,
//             "items.image": 0,
//             "items._v": 0,
//             "items.createdAt": 0,
//             "items.updatedAt": 0,
//         },
//     },
//     {
//         $unwind: "$items", // Deconstruct the items array
//     },
//     {
//         $group: {
//             _id: "$items.category",
//             categoryName: { $first: "$items.category" },
//             products: { $push: "$items" },
//             remainingFields: { $first: "$$ROOT" },
//         },
//     },
//     {
//         $group: {
//             _id: null,
//             items: {
//                 $push: {
//                     categoryName: "$categoryName",
//                     products: {
//                         $reduce: {
//                             input: "$products",
//                             initialValue: [],
//                             in: {
//                                 $concatArrays: [
//                                     "$$value",
//                                     [
//                                         {
//                                             $mergeObjects: [
//                                                 "$$this",
//                                                 { ownerId: null },
//                                             ],
//                                         },
//                                     ],
//                                 ],
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     },
//     {
//         $project: {
//             _id: 0,
//             remainingFields: 1,
//             items: 1,
//         },
//     },
// ]);