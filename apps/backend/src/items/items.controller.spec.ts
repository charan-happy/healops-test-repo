import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should return all items', () => {
    const items = controller.findAll();
    expect(items.length).toBeGreaterThan(0);
  });

  it('should return a single item', () => {
    const item = controller.findOne(1);
    expect(item).toBeDefined();
    expect(item.id).toBe(1);
  });

  it('should create an item', () => {
    const item = controller.create({
      name: 'New',
      description: 'New item',
    });
    expect(item.name).toBe('New');
  });
});
