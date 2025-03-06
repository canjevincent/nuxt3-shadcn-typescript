import type { SafeProduct } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  selectedProduct?: SafeProduct;  
}

const state = reactive<PreviewModalStore>({
  isOpen: false,
  selectedProduct: undefined,
})

export default () => {
  const { selectedProduct, isOpen } = toRefs(state);
  const onOpen = (payload: SafeProduct) => {
    state.isOpen = true
    state.selectedProduct = payload
  }

  const onClose = () => {
    state.isOpen = false
    state.selectedProduct = undefined
  }

  return {
    onOpen,
    onClose,
    selectedProduct,
    isOpen
  }
}