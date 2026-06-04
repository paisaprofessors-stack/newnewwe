    (() => {
      const loader = document.getElementById('loader');
      const pct = document.getElementById('loaderPct');
      if (!loader) return;

      const page = document.body?.dataset.page === 'product' ? 'product' : 'home';
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const HOME_KEY = 'fv_loader_home_seen_v1';
      const PRODUCT_KEY = 'fv_loader_product_seen_v1';
      const storage = {
        get(key) {
          try { return localStorage.getItem(key); } catch (e) { return null; }
        },
        set(key) {
          try { localStorage.setItem(key, String(Date.now())); } catch (e) {}
        }
      };

      const hasSeenHome = Boolean(storage.get(HOME_KEY));
      const hasSeenProduct = Boolean(storage.get(PRODUCT_KEY));
      const minMs = reduceMotion
        ? 900
        : page === 'home'
          ? (hasSeenHome ? 0 : 5000)
          : (hasSeenProduct ? 0 : 3000);

      if (page === 'home' && hasSeenHome) {
        loader.remove();
        return;
      }

      if (page === 'product' && hasSeenProduct) {
        loader.remove();
        return;
      }

      const maxMs = Math.max(minMs + 5000, 6000);
      const startedAt = Date.now();
      let progress = 0;
      let fullyLoaded = document.readyState === 'complete';
      let assetsReady = false;
      let finished = false;

      const toAbsolute = (src) => {
        try { return new URL(src, window.location.href).href; } catch (e) { return ''; }
      };

      const preloadImage = (src) => new Promise((resolve) => {
        const url = toAbsolute(src);
        if (!url) {
          resolve();
          return;
        }
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
        if (img.complete) resolve();
      });

      const collectAssetUrls = () => {
        const urls = new Set();
        document.querySelectorAll('img[src], link[rel="preload"][as="image"][href]').forEach((node) => {
          urls.add(node.getAttribute('src') || node.getAttribute('href'));
        });
        (window.FVRST_PRODUCTS || []).forEach((product) => {
          const images = product.images || {};
          ['main', 'hover', 'back', 'hero', 'editorial'].forEach((key) => {
            if (images[key]) urls.add(images[key]);
          });
          [...(images.gallery || []), ...(images.motion || [])].forEach((image) => {
            if (image?.src) urls.add(image.src);
          });
          (product.reviews || []).forEach((review) => {
            if (review?.photo) urls.add(review.photo);
          });
        });
        return [...urls].filter(Boolean);
      };

      const warmAssets = () => {
        const urls = collectAssetUrls();
        const warmup = Promise.all(urls.map(preloadImage));
        const timeout = new Promise((resolve) => setTimeout(resolve, Math.min(maxMs, 4500)));
        Promise.race([warmup, timeout]).then(() => {
          assetsReady = true;
          tryFinish();
        });
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', warmAssets, { once: true });
      } else {
        warmAssets();
      }

      const tick = () => {
        const elapsed = Date.now() - startedAt;
        const timeProgress = minMs ? Math.min(90, Math.round((elapsed / minMs) * 90)) : 90;
        progress = Math.max(progress, Math.min(96, timeProgress));
        if (progress < 92) {
          const inc = Math.max(1, Math.round((92 - progress) * 0.12));
          progress = Math.min(92, progress + inc);
        }
        if (pct) pct.textContent = String(progress).padStart(2, '0') + '%';
      };
      const ticker = setInterval(tick, 140);
      tick();

      const finish = () => {
        if (finished) return;
        finished = true;
        clearInterval(ticker);
        if (pct) pct.textContent = '100%';
        storage.set(page === 'home' ? HOME_KEY : PRODUCT_KEY);
        setTimeout(() => {
          loader.classList.add('is-done');
          setTimeout(() => loader.remove(), 700);
        }, reduceMotion ? 0 : 220);
      };

      const onLoad = () => {
        fullyLoaded = true;
        tryFinish();
      };
      if (!fullyLoaded) {
        window.addEventListener('load', onLoad, { once: true });
      }

      const minTimer = setTimeout(tryFinish, minMs);
      const maxTimer = setTimeout(finish, maxMs);

      function tryFinish() {
        if (Date.now() - startedAt < minMs) {
          setTimeout(tryFinish, minMs - (Date.now() - startedAt));
          return;
        }
        clearTimeout(minTimer);
        clearTimeout(maxTimer);
        finish();
      }
    })();
