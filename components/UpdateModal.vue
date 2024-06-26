<script setup lang='ts'>
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  carId: {
    type: String,
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

const emit = defineEmits(['carUpdate'])

let newCode = props.carCode
let newBrand = props.carBrand
let newStatus = props.carStatus
let newDescription = props.carDescription

const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

function updateField(field: string, value: string) {
  switch (field) {
    case 'code':
      newCode = value
      break
    case 'brand':
      newBrand = value
      break
    case 'status':
      newStatus = value
      break
    case 'description':
      newDescription = value
  }
}

function displayAlert(type: string, message: string) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

function updateCar(shouldUpdate: boolean) {
  alertMessage.value = ''

  if (!shouldUpdate)
    return emit('carUpdate')

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

  emit('carUpdate', modifiedCar)
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
        @input="updateField('code', $event)"
      />

      <label class="-mb-2">Brand</label>
      <SelectBox
        type="Brand"
        :value="newBrand"
        :string-input="true"
        input-placeholder="brand"
        @input="updateField('brand', $event)"
      />

      <label class="-mb-2">Status</label>
      <SelectBox
        type="Status"
        update
        :value="newStatus"
        @input="updateField('status', $event)"
      />

      <label class="-mb-2">Description</label>
      <InputBox
        :value="newDescription"
        :string-input="true"
        input-placeholder="description"
        @input="updateField('description', $event)"
      />

      <div class="mt-8">
        <button
          class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          @click="updateCar(true)"
        >
          Update
        </button>

        <button
          class="px-12 py-2 text-white bg-red-800 rounded"
          @click="updateCar(false)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
