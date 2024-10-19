import Invoice from '../models/Invoice.js';
import Order from '../models/Order.js';

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('order');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('order');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { orderId, dueDate } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const invoice = new Invoice({
      order: orderId,
      invoiceNumber: `INV-${Date.now()}`,
      totalAmount: order.totalAmount,
      dueDate
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: 'Error creating invoice', error: error.message });
  }
};

export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: 'Error updating invoice status', error: error.message });
  }
};