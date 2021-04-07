import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import flushPromises from 'flush-promises';
import VendingMachine from '@/components/VendingMachine.vue';

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);

jest.mock('axios', () => ({
  get: () => Promise.resolve({
    data: {
      products: [{
        id: 1, name: 'Apple', quantity: 9, price: 10,
      }],
    },
  }),
  patch: () => Promise.resolve({
    data: {
      id: 1,
    },
  }),
}));

afterAll(() => jest.unmock('axios'));

describe('VendingMachine.vue', () => {
  describe('VendingMachine Methods', () => {
    it('getAllProducts method', async () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      wrapper.vm.getAllProducts();
      await flushPromises();
      expect(wrapper.vm.products.length).toEqual(1);
      expect(wrapper.vm.products[0].id).toEqual(1);
    });

    it('openConfirmModal method', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const product = {
        id: 1,
        name: 'apple',
      };
      wrapper.vm.openConfirmModal(product);
      expect(wrapper.vm.productSelected.id).toEqual(1);
    });

    it('addMoneyToMachine method', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      wrapper.setData({
        customerMoney: 5,
      });
      wrapper.vm.addMoneyToMachine();
      expect(wrapper.vm.moneyInMachine).toEqual(5);
      expect(wrapper.vm.customerMoney).toEqual(0);
    });

    it('cancelPurchase method', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const formatSpy = jest.fn();
      wrapper.vm.cancelTranscation = formatSpy;
      wrapper.vm.cancelPurchase();
      expect(wrapper.vm.alertMessage).toEqual('You have cancelled purchase. Your Money has been refunded.');
      expect(formatSpy).toHaveBeenCalled();
    });

    it('cancelTranscation method', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const formatSpy = jest.fn();
      wrapper.vm.showAlert = formatSpy;
      wrapper.vm.cancelPurchase();
      expect(wrapper.vm.moneyInMachine).toEqual(0);
      expect(wrapper.vm.alertVariant).toEqual('danger');
      expect(formatSpy).toHaveBeenCalled();
    });

    it('showAlert method', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      wrapper.setData({
        dismissSecs: 5,
      });
      wrapper.vm.showAlert();
      expect(wrapper.vm.dismissCountDown).toEqual(5);
    });

    it('purcharse method with ideal scenario', async () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const product = {
        id: 1,
        name: 'apple',
        quantity: 5,
        price: 5,
      };
      wrapper.setData({
        productSelected: product,
        moneyInMachine: 5,
      });
      wrapper.vm.purcharse();
      await flushPromises();
      expect(wrapper.vm.alertVariant).toEqual('success');
      expect(wrapper.vm.alertMessage).toEqual('Transaction completed successfully. Please collect your product. Thank you.');
    });

    it('purcharse method with customer added extra money scenario', async () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const product = {
        id: 1,
        name: 'apple',
        quantity: 5,
        price: 5,
      };
      wrapper.setData({
        productSelected: product,
        moneyInMachine: 8,
      });
      wrapper.vm.purcharse();
      await flushPromises();
      expect(wrapper.vm.alertVariant).toEqual('success');
      expect(wrapper.vm.alertMessage).toEqual('Transaction completed successfully. Please collect your product. Thank you. Please collect 3 Rs change.');
    });

    it('purcharse method with customer added less money scenario', () => {
      const wrapper = shallowMount(VendingMachine, { localVue });
      const product = {
        id: 1,
        name: 'apple',
        quantity: 5,
        price: 10,
      };
      wrapper.setData({
        productSelected: product,
        moneyInMachine: 8,
      });
      wrapper.vm.purcharse();
      expect(wrapper.vm.alertVariant).toEqual('danger');
      expect(wrapper.vm.alertMessage).toEqual('Transaction has been cancelled because of insufficient funds. Your Money has been refunded.');
    });
  });
});
