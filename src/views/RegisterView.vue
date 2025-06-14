<template>
  <div class="register">
    <h2>Выберите язык</h2>
    <select v-model="language">
      <option value="RU">Русский</option>
      <option value="KY">Кыргызский</option>
      <option value="EN">English</option>
    </select>

    <h2>Область</h2>
    <select v-model.number="regionId">
      <option disabled value="">Выберите область</option>
      <option v-for="r in regions" :key="r.id" :value="r.id">{{ r.name }}</option>
    </select>

    <h2>Город</h2>
    <select v-model.number="cityId" :disabled="!regionId">
      <option disabled value="">Выберите город</option>
      <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>

    <h2>Школа</h2>
    <select v-model.number="schoolId" :disabled="!cityId">
      <option disabled value="">Выберите школу</option>
      <option v-for="s in schools" :key="s.id" :value="s.id">{{ s.name }}</option>
    </select>

    <button @click="proceed" :disabled="!schoolId">Продолжить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchRegions, fetchCities, fetchSchools, registerUser } from '../api'

const router = useRouter()
const language = ref('RU')

const regions = ref<Array<{ id: number; name: string }>>([])
const cities = ref<Array<{ id: number; name: string }>>([])
const schools = ref<Array<{ id: number; name: string }>>([])
const regionId = ref<number | null>(null)
const cityId = ref<number | null>(null)
const schoolId = ref<number | null>(null)

onMounted(async () => {
  try {
    regions.value = await fetchRegions()
  } catch (e) {
    console.error(e)
  }
})

watch(regionId, async id => {
  if (!id) return
  cityId.value = null
  schoolId.value = null
  cities.value = []
  schools.value = []
  try {
    cities.value = await fetchCities(id)
  } catch (e) {
    console.error(e)
  }
})

watch(cityId, async id => {
  if (!id) return
  schoolId.value = null
  schools.value = []
  try {
    schools.value = await fetchSchools(id)
  } catch (e) {
    console.error(e)
  }
})

async function proceed() {
  if (!schoolId.value) return
  try {
    await registerUser({ schoolId: schoolId.value, language: language.value })
    localStorage.setItem('language', language.value)
    localStorage.setItem('registered', '1')
    router.push('/tests')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
select,
input,
button {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
button {
  background: var(--accent-color);
  color: #fff;
}
</style>
