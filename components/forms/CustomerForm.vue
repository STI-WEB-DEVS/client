<script setup lang="ts">
import { ref } from 'vue'
import Feedback from '~/components/FeedbackModal.vue'
import { customerService } from '~/api/customer/CustomerService'

// ✅ Declare emits sa gawas sa function
const emit = defineEmits(['submitted'])
    
const props = defineProps<{
  isUpdate?: boolean
  initialData?: Record<string, any>
  uuid?: string
}>()

const formData = ref({ ...props.initialData })
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

async function handleSubmit() {
  try {
    if (props.isUpdate && props.uuid) {
      await customerService.update(props.uuid, formData.value)
      feedbackMessage.value = 'Customer updated successfully!'
      feedbackType.value = 'success'
    } else {
      await customerService.create(formData.value)
      feedbackMessage.value = 'Customer created successfully!'
      feedbackType.value = 'success'
    }

    // ✅ Emit event para ma‑refresh ang list sa parent
    emit('submitted')

  } catch (error: any) {
    feedbackMessage.value = error.message || 'Something went wrong'
    feedbackType.value = 'error'
  }
}
</script>
