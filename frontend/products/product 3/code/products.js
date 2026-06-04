window.FVRST_CONFIG = {
  freeShippingThreshold: 599,
  baseDelivery: 30
};

const FVRST_PRODUCT_ASSET_BASE = document.body?.dataset.productAssetBase || '';
const productAsset = (file) => FVRST_PRODUCT_ASSET_BASE + file;

window.FVRST_PRODUCTS = [
  {
    id: 'built-for-speed-oversized-tee-01',
    slug: 'built-for-speed-oversized-t-shirt',
    name: 'Built For Speed Oversized T-shirt',
    shortName: 'Built For Speed Tee',
    category: 'Oversized t-shirt',
    badge: 'New drop',
    price: 699,
    compare: 1999,
    description: 'Heavyweight 240 GSM cotton. Oversized black streetwear fit with a bold Built For Speed graphic and premium finish.',
    fitNotes: 'Oversized fit. Take your true size for the intended silhouette.',
    color: 'Black',
    origin: 'Made in India',
    images: {
      main: productAsset('preview1.webp'),
      hover: productAsset('preview2.webp'),
      back: productAsset('preview3.webp'),
      hero: productAsset('inmotion1.webp'),
      editorial: productAsset('preview7.webp'),
      gallery: [
        { label: 'Preview 1', src: productAsset('preview1.webp'), alt: 'Built For Speed Oversized T-shirt preview view 1' },
        { label: 'Preview 2', src: productAsset('preview2.webp'), alt: 'Built For Speed Oversized T-shirt preview view 2' },
        { label: 'Preview 3', src: productAsset('preview3.webp'), alt: 'Built For Speed Oversized T-shirt preview view 3' },
        { label: 'Preview 4', src: productAsset('preview4.webp'), alt: 'Built For Speed Oversized T-shirt preview view 4' },
        { label: 'Preview 5', src: productAsset('preview5.webp'), alt: 'Built For Speed Oversized T-shirt preview view 5' },
        { label: 'Preview 6', src: productAsset('preview6.webp'), alt: 'Built For Speed Oversized T-shirt preview view 6' },
        { label: 'Preview 7', src: productAsset('preview7.webp'), alt: 'Built For Speed Oversized T-shirt preview view 7' }
      ],
      motion: [
        { src: productAsset('inmotion1.webp'), alt: 'Built For Speed Oversized T-shirt in motion view 1', tall: true },
        { src: productAsset('inmotion2.webp'), alt: 'Built For Speed Oversized T-shirt in motion view 2' }
      ]
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'M',
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 },
    specs: [
      ['Fabric', '100% cotton, 240 GSM jersey'],
      ['Fit', 'Relaxed oversized cut'],
      ['Colour', 'Black'],
      ['Print', 'Built For Speed graphic print'],
      ['Care', 'Cold wash, inside out, no tumble dry'],
      ['Origin', 'Made in India']
    ],
    proof: [
      ['240 GSM', 'Heavyweight cotton that drapes well and holds shape wash after wash.', 'Cotton'],
      ['Oversized', 'Relaxed boxy cut with dropped shoulders for a true streetwear silhouette.', 'Fit'],
      ['Clean Black', 'Deep black finish that makes the graphic stand out while staying easy to style.', 'Finish'],
      ['Graphic Detail', 'Bold Built For Speed artwork with a premium streetwear feel.', 'Print']
    ],
    reviewSummary: {
      rating: '4.9',
      text: 'based on recent verified orders'
    },
    reviews: [
      {
        name: 'Rohan S.',
        photo: productAsset('review1.webp'),
        quote: 'The fit is exactly what I was looking for. Oversized, comfortable, and the fabric feels really premium.'
      },
      {
        name: 'Aditi',
        photo: productAsset('review2.webp'),
        quote: 'Absolutely love how easy it is to style. The quality is amazing and the black color looks super clean.'
      },
      {
        name: 'Aryan sharma',
        photo: productAsset('review3.webp'),
        quote: 'Great attention to detail. The stitching, fit, and overall finish make it feel much more expensive than it is.'
      }
    ]
  }
];
