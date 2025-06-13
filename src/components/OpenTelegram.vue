<template>
  <div class="open-telegram">
    <h1>Откройте приложение в Telegram</h1>
    <p>
      Для использования мини‑приложения перейдите по ссылке ниже или
      отсканируйте QR‑код.
    </p>
    <a :href="telegramLink" target="_blank" class="tg-link">Открыть в Telegram</a>
    <img :src="qrUrl" alt="QR code" class="qr" />
  </div>
</template>

<script setup lang="ts">
const telegramLink = 'https://t.me/your_channel';
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(telegramLink)}`;
</script>

<style scoped>
.open-telegram {
  text-align: center;
  padding: 2rem;
}
.qr {
  margin-top: 1rem;
  width: 150px;
  height: 150px;
}
.tg-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--accent-color);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
}
</style>
