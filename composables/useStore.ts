import { useToast } from '~/components/ui/toast';
import type { APIError } from '~/types'; 

interface State {
  isLoading: boolean
  appError: APIError | null
  isAlertModalVisible: boolean
}

// reactive<>, It typically represents a wrapper around a value that makes it reactive, meaning changes 
// to the value are automatically propagated to dependent parts of the system.
const state = reactive<State>({
  isLoading: false,
  appError: null,
  isAlertModalVisible: false
});

export default () => {
  const { isLoading, appError, isAlertModalVisible } = toRefs(state);
  const { toast } = useToast();

  const toggleLoading = (v: boolean) => {
    state.isLoading = v;
  }

  const toggleAlertModal = (v: boolean) => {
    state.isAlertModalVisible = v;
  }

  const toggleError = (error: null | APIError) => {
    state.appError = error;
  }

  const showError = (error: APIError) => {
    toast({
      variant: 'destructive',
      title: error.statusCode + '',
      description: error.message ? error.message : error.statusMessage,
    })
  }

  const showMessage = (content : {
    title: string,
    description?: string,
    variant?: "destructive" | "default" | null | undefined
  }) => {
    toast({
      variant: content.variant,
      title: content.title,
      description: content.description,
    })
  }

  return {
    isLoading,
    appError,
    showError,
    showMessage,
    toggleLoading,
    toggleError,
    toggleAlertModal,
    isAlertModalVisible
  }
}