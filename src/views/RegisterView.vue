<template>
  <div class="register">
    <h2>Выберите язык</h2>
    <select v-model="language">
      <option value="RU">Русский</option>
      <option value="KY">Кыргызский</option>
    </select>

    <h2>Область</h2>
    <select v-model.number="regionId">
      <option disabled value="">Выберите область</option>
      <option v-for="r in regions" :key="r.id" :value="r.id">
        {{ language === 'KY' ? r.nameKy : r.nameRu }}
      </option>
    </select>

    <h2>Город</h2>
    <select v-model.number="cityId" :disabled="!regionId">
      <option disabled value="">Выберите город</option>
      <option v-for="c in cities" :key="c.id" :value="c.id">
        {{ language === 'KY' ? c.nameKy : c.nameRu }}
      </option>
    </select>

    <h2>Школа</h2>
    <select v-model.number="schoolId" :disabled="!cityId">
      <option disabled value="">Выберите школу</option>
      <option v-for="s in schools" :key="s.id" :value="s.id">
        {{ language === 'KY' ? s.nameKy : s.nameRu }}
      </option>
    </select>

    <button @click="proceed" :disabled="!schoolId">Продолжить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchRegions, fetchCities, fetchSchools, registerUser } from '../api'
import { sendData } from '../telegram'

const router = useRouter()
const language = ref('RU')

interface LocItem {
  id: number
  nameRu: string
  nameKy: string
}

const regions = ref<Array<LocItem>>([])
const cities = ref<Array<LocItem>>([])
const schools = ref<Array<LocItem>>([])
const regionId = ref<number | null>(null)
const cityId = ref<number | null>(null)
const schoolId = ref<number | null>(null)

onMounted(async () => {
  try {
    regions.value = await fetchRegions()
    console.log('loaded regions', regions.value)
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
    console.log('loaded cities', cities.value)
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
    console.log('loaded schools', schools.value)
  } catch (e) {
    console.error(e)
  }
})

async function proceed() {
  if (!schoolId.value) return
  try {
    console.log('proceed: registering user')
    await registerUser({ schoolId: schoolId.value, language: language.value })
    console.log('proceed: registration complete')
    const selected = schools.value.find(s => s.id === schoolId.value)
    if (selected) {
      const name = language.value === 'KY' ? selected.nameKy : selected.nameRu
      localStorage.setItem('school', name)
    }
    localStorage.setItem('language', language.value)
    localStorage.setItem('registered', '1')
    sendData('registered')
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
</style>
