import { ref } from 'vue';
import { orderSummaryService } from '~/api/order/OrderSummaryService';

export const useOrderSummary = () => {
    const summary = ref<any>(null);
    const loading = ref(false);
    const error = ref('');
    const filters = ref({ from_date: '', to_date: '' });

    const fetchSummary = async (params: { from_date?: string; to_date?: string } = {}) => {
        loading.value = true;
        error.value = '';

        try {
            const response = await orderSummaryService.fetch(params);
            summary.value = response.data || null;
        } catch (err: any) {
            error.value = err?.message || 'Unable to load order summary.';
            summary.value = null;
        } finally {
            loading.value = false;
        }
    };

    return {
        summary,
        loading,
        error,
        filters,
        fetchSummary,
    };
};
