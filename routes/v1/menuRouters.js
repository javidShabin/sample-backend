const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenu,
  deleteMenuItem,
  filteredMenu,

} = require("../../controllers/menuController");
const { upload } = require("../../middlewares/multer");
const { sellerAuthentication } = require("../../middlewares/sellerAuth");
const router = express.Router();

// Get all menu items for a restaurant
router.get("/allmenus", getMenuItems);
// Get menu by id
router.get("/item/:id", getMenuItemById);
// Filter menu item
router.get("/items/filter", filteredMenu)
// Create menu item
router.post("/allmenus", sellerAuthentication, upload.single("image"), createMenuItem);
// Update menus
router.put("/item/:id", sellerAuthentication, updateMenu);
// Update menus
router.delete("/item/:id", sellerAuthentication, deleteMenuItem);

module.exports = { menusRouter: router };
