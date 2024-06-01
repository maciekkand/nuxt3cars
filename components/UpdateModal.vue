<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  carId: {
    type: Number,
    required: true,
  },
  carCode: {
    type: String,
    required: true,
  },
  carBrand: {
    type: String,
    required: true,
  },
  carStatus: {
    type: String,
    required: true,
  },
  carDescription: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['shouldUpdate'])

let newCode = props.carCode
let newBrand = props.carBrand
let newStatus = props.carStatus
let newDescription = props.carDescription

const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

function setCode(param) {
  newCode = param
}

function setBrand(param) {
  newBrand = param
}

function setStatus(param) {
  newStatus = param
}

function setDescription(param) {
  newDescription = param
}

function displayAlert(type, message) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

function shouldUpdate(shouldUpdate) {
  alertMessage.value = ''

  if (!shouldUpdate)
    return emit('shouldUpdate')

  if (!newCode)
    alertMessage.value = `Please fill in the 'Code' field`

  if (!newBrand)
    alertMessage.value = `Please fill in the 'Brand' field`

  if (!newStatus)
    alertMessage.value = `Please fill in the 'Status' field`

  if (alertMessage.value)
    return displayAlert('error', alertMessage.value)

  const modifiedCar = {
    id: props.carId,
    code: newCode,
    brand: newBrand,
    status: newStatus,
    description: newDescription,
  }

  emit('shouldUpdate', modifiedCar)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 -mt-28">
    <div class="flex flex-col gap-3 p-8 ml-48 bg-white">
      <h1 class="flex justify-center text-2xl">
        {{ message }}
      </h1>

      <h2 class="text-2xl">
        Id: {{ props.carId }}
      </h2>

      <div class="h-4 border border-white w-72">
        <CarsAlert
          v-if="showAlert"
          :type="alertType"
          :message="alertMessage"
          class="-mt-1"
        />
      </div>

      <label class="-mb-2">Code</label>
      <InputBox
        :value="newCode"
        :string-input="true"
        input-placeholder="code"
        @input="setCode"
      />

      <label class="-mb-2">Brand</label>
      <SelectBox
        type="Brand"
        :value="newBrand"
        :string-input="true"
        input-placeholder="brand"
        @input="setBrand"
      />

      <label class="-mb-2">Status</label>
      <SelectBox
        type="Status"
        update
        :value="newStatus"
        @input="setStatus"
      />

      <label class="-mb-2">Description</label>
      <InputBox
        :value="newDescription"
        :string-input="true"
        input-placeholder="description"
        @input="setDescription"
      />

      <div class="mt-8">
        <button
          class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          @click="shouldUpdate(true)"
        >
          Update
        </button>

        <button
          class="px-12 py-2 text-white bg-red-800 rounded"
          @click="shouldUpdate(false)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
