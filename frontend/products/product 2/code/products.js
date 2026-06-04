window.FVRST_CONFIG = {
  freeShippingThreshold: 599,
  baseDelivery: 30
};

const FVRST_PRODUCT_ASSET_BASE = document.body?.dataset.productAssetBase || '';
const productAsset = (file) => FVRST_PRODUCT_ASSET_BASE + file;

window.FVRST_PRODUCTS = [
  {
    id: 'lunar-black-full-sleeve-01',
    slug: 'lunar-black-full-sleeve-t-shirt',
    name: 'Lunar Black Full Sleeve T Shirt',
    shortName: 'Lunar Black Full Sleeve',
    category: 'Full sleeve t-shirt',
    badge: 'New drop',
    price: 599,
    compare: 1499,
    description: 'Heavyweight 240 GSM cotton. Full sleeve lunar-black fit with a clean dark streetwear finish.',
    color: 'Lunar black',
    origin: 'Made in India',
    images: {
      main: productAsset('preview1.webp'),
      hover: productAsset('preview2.webp'),
      back: productAsset('preview3.webp'),
      hero: productAsset('inmotion1.webp'),
      editorial: productAsset('inmotion4.webp'),
      gallery: [
        { label: 'Preview 1', src: productAsset('preview1.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 1' },
        { label: 'Preview 2', src: productAsset('preview2.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 2' },
        { label: 'Preview 3', src: productAsset('preview3.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 3' },
        { label: 'Preview 4', src: productAsset('preview4.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 4' },
        { label: 'Preview 5', src: productAsset('preview5.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 5' }
      ],
      motion: [
        { src: productAsset('inmotion1.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 1', tall: true },
        { src: productAsset('inmotion2.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 2' },
        { src: productAsset('inmotion3.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 3' },
        { src: productAsset('inmotion4.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 4' }
      ]
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 },
    specs: [
      ['Fabric', '100% cotton, 240 GSM jersey'],
      ['Fit', 'Relaxed full sleeve cut'],
      ['Colour', 'Lunar black'],
      ['Sleeves', 'Full sleeves with streetwear proportions'],
      ['Care', 'Cold wash, inside out, no tumble dry'],
      ['Origin', 'Made in India']
    ],
    proof: [
      ['240 GSM', 'Heavyweight cotton that drapes well and holds shape wash after wash.', 'Cotton'],
      ['Full Sleeve', 'Relaxed long-sleeve coverage with an easy streetwear silhouette.', 'Fit'],
      ['Lunar Black', 'Deep black finish with a clean, minimal everyday look.', 'Finish'],
      ['Daily Layer', 'Built to wear solo or layered without losing structure.', 'Use']
    ],
    reviewSummary: {
      rating: '4.9',
      text: 'based on recent verified orders'
    },
    reviews: [
      {
        name: 'Karan Mehta',
        photo: productAsset('review3.webp'),
        quote: 'Honestly one of the cleanest black tees I have bought online. Stitching and fabric quality feel premium.'
      },
      {
        name: 'Abeer Khan',
        photo: productAsset('review1.webp'),
        quote: 'Sleeves fall perfectly and the fabric has a really nice texture. Looks even better in natural light.'
      },
      {
        name: 'Dev Arora',
        photo: productAsset('review2.webp'),
        quote: 'Minimal design but feels very premium when worn. Got compliments the first day I wore it.'
      }
    ]
  }
];
