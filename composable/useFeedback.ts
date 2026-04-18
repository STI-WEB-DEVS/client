export const useFeedback = () => {
  const isOpen = ref(false);
  const message = ref('');

  const showFeedback = (msg: string) => {
    message.value = msg;
    isOpen.value = true;
  };

  const closeFeedback = () => {
    isOpen.value = false;
    message.value = '';
  };

  return {
    isOpen,
    message,
    showFeedback,
    closeFeedback
  };
};