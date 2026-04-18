<script setup>
const props = defineProps({
  title: String,
  service: Object, // Pass CustomerService or ProductService
  initialData: Object
});

const emit = defineEmits(['saved']);

const submitForm = async (formData) => {
  try {
    const response = await props.service.save(formData);
    // Task 6: Trigger your Feedback component here
    // Example: useFeedbackStore().show('Success!', 'Operation completed.')
    emit('saved', response);
  } catch (error) {
    // Handle error feedback
  }
};
</script>