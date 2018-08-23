import { KitchenSinkRoutingModule } from './kitchen-sink-routing.module';

describe('KitchenSinkRoutingModule', () => {
  let kitchenSinkRoutingModule: KitchenSinkRoutingModule;

  beforeEach(() => {
    kitchenSinkRoutingModule = new KitchenSinkRoutingModule();
  });

  it('should create an instance', () => {
    expect(kitchenSinkRoutingModule).toBeTruthy();
  });
});
