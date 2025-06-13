<template>
  <div class="open-telegram">
    <div class="card">
      <h1>Откройте приложение в Telegram</h1>
      <p>
        Чтобы использовать мини‑приложение, откройте его в Telegram по ссылке ниже
        или отсканируйте QR‑код.
      </p>
      <a :href="telegramLink" target="_blank" class="tg-link">
        🔗 Открыть в Telegram
      </a>
      <img :src="qrUrl" alt="QR code" class="qr" />
    </div>
  </div>
</template>

<script setup lang="ts">
const telegramLink = 'https://t.me/your_channel';
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(telegramLink)}`;
</script>

<style scoped>
.open-telegram {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f7f8fa;
  padding: 1rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  color: #444;
  margin-bottom: 1.5rem;
}

.tg-link {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  background-color: #0088cc;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.qr {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
