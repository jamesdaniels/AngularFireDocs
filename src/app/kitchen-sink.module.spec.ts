import { KitchenSinkModule } from './kitchen-sink.module';

describe('KitchenSinkModule', () => {
  let kitchenSinkModule: KitchenSinkModule;

  beforeEach(() => {
    kitchenSinkModule = new KitchenSinkModule();
  });

  it('should create an instance', () => {
    expect(kitchenSinkModule).toBeTruthy();
  });
});
