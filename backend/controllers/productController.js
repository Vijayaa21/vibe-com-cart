import Product from '../models/Product.js';

const SAMPLE_PRODUCTS = [
  { 
    id: 101, 
    title: 'Vibe T-Shirt', 
    price: 499, 
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 
    description: 'Comfortable cotton tee with modern design' 
  },
  { 
    id: 102, 
    title: 'Vibe Hoodie', 
    price: 1299, 
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop', 
    description: 'Cozy hoodie for everyday wear' 
  },
  { 
    id: 103, 
    title: 'AirPods Replica', 
    price: 129, 
    thumbnail: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop', 
    description: 'Wireless buds with crystal clear sound' 
  },
  { 
    id: 104, 
    title: 'Charger SXT RWD', 
    price: 32999.99, 
    thumbnail: 'https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=500&h=500&fit=crop', 
    description: 'High-speed charger for all devices' 
  },
  { 
    id: 105, 
    title: 'Green Oval Earring', 
    price: 24.99, 
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', 
    description: 'Stylish earring with elegant design' 
  },
  { 
    id: 106, 
    title: 'Apple MacBook Pro 14', 
    price: 1999.99, 
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', 
    description: 'Powerful laptop for professionals' 
  },
  { 
    id: 107, 
    title: 'Smart LED Strip', 
    price: 1499, 
    thumbnail: 'https://images.unsplash.com/photo-1586902197503-e71026292412?w=500&h=500&fit=crop', 
    description: 'RGB mood lighting for your space' 
  },
  { 
    id: 108, 
    title: 'Eco Water Bottle', 
    price: 899, 
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop', 
    description: 'Sustainable stainless steel bottle' 
  },
  { 
    id: 109, 
    title: 'Wireless Power Bank', 
    price: 2499, 
    thumbnail: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop', 
    description: '20000mAh with fast charging support' 
  },
  { 
    id: 110, 
    title: 'Mini Air Purifier', 
    price: 3499, 
    thumbnail: 'https://images.unsplash.com/photo-1605630988575-92c9da7da13a?w=500&h=500&fit=crop', 
    description: 'Portable air cleaner with HEPA filter' 
  },
  { 
    id: 111, 
    title: 'Smart Watch Pro', 
    price: 4999, 
    thumbnail: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop', 
    description: 'Fitness and health tracking with style' 
  },
  { 
    id: 112, 
    title: 'Bluetooth Speaker', 
    price: 1999, 
    thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop', 
    description: 'Waterproof portable speaker with bass' 
  },
  { 
    id: 113, 
    title: 'Vibe Backpack', 
    price: 2299, 
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 
    description: 'Anti-theft laptop backpack with USB port' 
  },
  { 
    id: 114, 
    title: 'Desk Organizer Set', 
    price: 799, 
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop', 
    description: 'Modern minimalist desk accessories' 
  },
  { 
    id: 115, 
    title: 'Gaming Mouse', 
    price: 1899, 
    thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop', 
    description: 'RGB gaming mouse with programmable buttons' 
  },
  { 
    id: 116, 
    title: 'Wireless Keyboard', 
    price: 2499, 
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop', 
    description: 'Mechanical keyboard with RGB backlight' 
  }
];

export async function getProducts(req, res, next) {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(SAMPLE_PRODUCTS);
    }
    await Promise.all(SAMPLE_PRODUCTS.map(p =>
      Product.updateOne({ id: p.id }, { $setOnInsert: p }, { upsert: true })
    ));
    const productsFromDb = await Product.find({}, { _id: 0, __v: 0 }).lean();

    const sampleById = SAMPLE_PRODUCTS.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});

    const products = (productsFromDb || []).map(p => {
      const sample = sampleById[p.id];
      return {
        id: p.id,
        title: p.title || sample?.title || 'Product',
        price: p.price != null ? p.price : (sample?.price ?? 0),
        thumbnail: p.thumbnail || sample?.thumbnail || '',
        description: p.description || sample?.description || ''
      };
    });

    res.json({ products });
  } catch (err) {
    next(err);
  }
}
