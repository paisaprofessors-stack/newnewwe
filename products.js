window.FVRST_CONFIG = {
  freeShippingThreshold: 599,
  baseDelivery: 30
};

const productAsset = (productDir, file) => `products/${productDir}/assets/${file}`;

window.FVRST_PRODUCTS = [
  {
    id: 'mono-tee-01',
    slug: 'travis-scott-oversized-tee',
    detailUrl: 'products/product 1/code/product.html',
    name: 'Travis Scott Oversized Tee',
    shortName: 'Travis Oversized Tee',
    category: 'Oversized tee',
    badge: 'New drop',
    price: 649,
    compare: 1200,
    description: 'Heavyweight 240 GSM cotton. Oversized washed-black fit with a front Travis Scott graphic and clean blank back.',
    fitNotes: 'Oversized fit. Take your true size for the intended silhouette.',
    color: 'Washed black',
    origin: 'Made in India',
    images: {
      main: productAsset('product 1', 'preview1.webp'),
      hover: productAsset('product 1', 'preview3.webp'),
      back: productAsset('product 1', 'preview2.webp'),
      hero: productAsset('product 1', 'inmotion1.webp'),
      editorial: productAsset('product 1', 'preview5.webp'),
      gallery: [
        { label: 'Front', src: productAsset('product 1', 'preview1.webp'), alt: 'Travis Scott Oversized Tee front view' },
        { label: 'Back', src: productAsset('product 1', 'preview2.webp'), alt: 'Travis Scott Oversized Tee back view' },
        { label: 'Front + Back', src: productAsset('product 1', 'preview3.webp'), alt: 'Travis Scott Oversized Tee front and back product view' },
        { label: 'Styled', src: productAsset('product 1', 'preview4.webp'), alt: 'Model wearing Travis Scott Oversized Tee front view' },
        { label: 'Styled', src: productAsset('product 1', 'preview5.webp'), alt: 'Model wearing Travis Scott Oversized Tee styled view' }
      ],
      motion: [
        { src: productAsset('product 1', 'inmotion1.webp'), alt: 'Model wearing Travis Scott Oversized Tee front view', tall: true },
        { src: productAsset('product 1', 'inmotion2.webp'), alt: 'Model wearing Travis Scott Oversized Tee back view' },
        { src: productAsset('product 1', 'inmotion3.webp'), alt: 'Model wearing Travis Scott Oversized Tee alternative front view' },
        { src: productAsset('product 1', 'inmotion4.webp'), alt: 'Model wearing Travis Scott Oversized Tee alternative back view' },
        { src: productAsset('product 1', 'inmotion5.webp'), alt: 'Model wearing Travis Scott Oversized Tee fit detail' },
        { src: productAsset('product 1', 'inmotion6.webp'), alt: 'Model wearing Travis Scott Oversized Tee back detail' }
      ]
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'L',
    stockBySize: { S: 4, M: 7, L: 12, XL: 3, XXL: 3 },
    specs: [
      ['Fabric', '100% cotton, 240 GSM jersey'],
      ['Fit', 'Relaxed oversized cut'],
      ['Colour', 'Washed black, cream print'],
      ['Print', 'Water-based front screenprint, blank back'],
      ['Care', 'Cold wash, inside out, no tumble dry'],
      ['Origin', 'Made in India']
    ],
    proof: [
      ['240 GSM', 'Heavyweight cotton that drapes well and holds shape wash after wash.', 'Cotton'],
      ['Oversized', 'Relaxed boxy cut with dropped shoulders for a true streetwear silhouette.', 'Fit'],
      ['Washed Black', 'Pre-washed finish for a softer hand-feel and lived-in look from day one.', 'Finish'],
      ['Front Print', 'Water-based front screenprint with a clean blank back, designed to age naturally with wear.', 'Print']
    ],
    reviewSummary: {
      rating: '4.9',
      text: 'based on recent verified orders'
    },
    reviews: [
      {
        name: 'Ananya R.',
        photo: productAsset('product 1', 'review3.webp'),
        quote: 'Really loved the fit and quality. The fabric feels premium and the print is sharp.'
      },
      {
        name: 'Vihal Jiarni',
        photo: productAsset('product 1', 'review1.webp'),
        quote: 'Nice t-shirt, print quality and fit is perfect.'
      },
      {
        name: 'Arnav',
        photo: productAsset('product 1', 'review2.webp'),
        quote: 'Really comfortable and pairs well with my grunge hoods. Great for bike rides too.'
      }
    ]
  },
  {
    id: 'lunar-black-full-sleeve-01',
    slug: 'lunar-black-full-sleeve-t-shirt',
    detailUrl: 'products/product 2/code/product.html',
    name: 'Lunar Black Full Sleeve T Shirt',
    shortName: 'Lunar Black Full Sleeve',
    category: 'Full sleeve t-shirt',
    badge: 'New drop',
    price: 599,
    compare: 1499,
    description: 'Heavyweight 240 GSM cotton. Full sleeve lunar-black fit with a clean dark streetwear finish.',
    fitNotes: 'Relaxed full sleeve fit. Take your true size for the intended silhouette.',
    color: 'Lunar black',
    origin: 'Made in India',
    images: {
      main: productAsset('product 2', 'preview1.webp'),
      hover: productAsset('product 2', 'preview2.webp'),
      back: productAsset('product 2', 'preview3.webp'),
      hero: productAsset('product 2', 'inmotion1.webp'),
      editorial: productAsset('product 2', 'inmotion4.webp'),
      gallery: [
        { label: 'Preview 1', src: productAsset('product 2', 'preview1.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 1' },
        { label: 'Preview 2', src: productAsset('product 2', 'preview2.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 2' },
        { label: 'Preview 3', src: productAsset('product 2', 'preview3.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 3' },
        { label: 'Preview 4', src: productAsset('product 2', 'preview4.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 4' },
        { label: 'Preview 5', src: productAsset('product 2', 'preview5.webp'), alt: 'Lunar Black Full Sleeve T Shirt preview view 5' }
      ],
      motion: [
        { src: productAsset('product 2', 'inmotion1.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 1', tall: true },
        { src: productAsset('product 2', 'inmotion2.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 2' },
        { src: productAsset('product 2', 'inmotion3.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 3' },
        { src: productAsset('product 2', 'inmotion4.webp'), alt: 'Lunar Black Full Sleeve T Shirt in motion view 4' }
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
        photo: productAsset('product 2', 'review3.webp'),
        quote: 'Honestly one of the cleanest black tees I have bought online. Stitching and fabric quality feel premium.'
      },
      {
        name: 'Abeer Khan',
        photo: productAsset('product 2', 'review1.webp'),
        quote: 'Sleeves fall perfectly and the fabric has a really nice texture. Looks even better in natural light.'
      },
      {
        name: 'Dev Arora',
        photo: productAsset('product 2', 'review2.webp'),
        quote: 'Minimal design but feels very premium when worn. Got compliments the first day I wore it.'
      }
    ]
  },
  {
    id: 'built-for-speed-oversized-tee-01',
    slug: 'built-for-speed-oversized-t-shirt',
    detailUrl: 'products/product 3/code/product.html',
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
      main: productAsset('product 3', 'preview1.webp'),
      hover: productAsset('product 3', 'preview2.webp'),
      back: productAsset('product 3', 'preview3.webp'),
      hero: productAsset('product 3', 'inmotion1.webp'),
      editorial: productAsset('product 3', 'preview7.webp'),
      gallery: [
        { label: 'Preview 1', src: productAsset('product 3', 'preview1.webp'), alt: 'Built For Speed Oversized T-shirt preview view 1' },
        { label: 'Preview 2', src: productAsset('product 3', 'preview2.webp'), alt: 'Built For Speed Oversized T-shirt preview view 2' },
        { label: 'Preview 3', src: productAsset('product 3', 'preview3.webp'), alt: 'Built For Speed Oversized T-shirt preview view 3' },
        { label: 'Preview 4', src: productAsset('product 3', 'preview4.webp'), alt: 'Built For Speed Oversized T-shirt preview view 4' },
        { label: 'Preview 5', src: productAsset('product 3', 'preview5.webp'), alt: 'Built For Speed Oversized T-shirt preview view 5' },
        { label: 'Preview 6', src: productAsset('product 3', 'preview6.webp'), alt: 'Built For Speed Oversized T-shirt preview view 6' },
        { label: 'Preview 7', src: productAsset('product 3', 'preview7.webp'), alt: 'Built For Speed Oversized T-shirt preview view 7' }
      ],
      motion: [
        { src: productAsset('product 3', 'inmotion1.webp'), alt: 'Built For Speed Oversized T-shirt in motion view 1', tall: true },
        { src: productAsset('product 3', 'inmotion2.webp'), alt: 'Built For Speed Oversized T-shirt in motion view 2' }
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
        photo: productAsset('product 3', 'review1.webp'),
        quote: 'The fit is exactly what I was looking for. Oversized, comfortable, and the fabric feels really premium.'
      },
      {
        name: 'Aditi',
        photo: productAsset('product 3', 'review2.webp'),
        quote: 'Absolutely love how easy it is to style. The quality is amazing and the black color looks super clean.'
      },
      {
        name: 'Aryan sharma',
        photo: productAsset('product 3', 'review3.webp'),
        quote: 'Great attention to detail. The stitching, fit, and overall finish make it feel much more expensive than it is.'
      }
    ]
  }
];
