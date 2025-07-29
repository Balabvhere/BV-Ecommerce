
const {ProductModel,CartModel} = require('../Models/ecom');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await CartModel.findOne({ userId, productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated", cartItem: existingCartItem });
    }

    const newCartItem = new CartModel({
      userId,
      productId,
      productname: product.productname,
      price: product.price,
      image: product.images?.[0]?.image || "",
      quantity: quantity || 1,
      stock:product.stock
    });

    await newCartItem.save();
    return res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all cart items for a user
exports.getCartByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cartItems = await CartModel.find({ userId }).populate('productId');
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update quantity of a cart item
exports.updateCartItem = async (req, res) => {
  const cartId = req.params.id;
  const { quantity } = req.body;

  try {
    const updatedItem = await CartModel.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true }
    );
    return res.status(200).json({ message: "Quantity updated", item: updatedItem });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  const cartId = req.params.id;

  try {
    await CartModel.findByIdAndDelete(cartId);
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Clear cart for a user
exports.clearCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    await CartModel.deleteMany({ userId });
    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
