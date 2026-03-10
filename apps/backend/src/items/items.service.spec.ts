import { NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    service = new ItemsService();
  });

  it('should return all items', () => {
    const items = service.findAll();
    expect(items).toHaveLength(3);
  });

  it('should find one item by id', () => {
    const item = service.findOne(1);
    expect(item.name).toBe('Pipeline Monitor');
  });

  it('should throw NotFoundException for missing item', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should create a new item', () => {
    const item = service.create({
      name: 'Test Item',
      description: 'A test',
    });
    expect(item.id).toBe(4);
    expect(item.status).toBe('active');
    expect(service.findAll()).toHaveLength(4);
  });

  it('should remove an item', () => {
    service.remove(1);
    expect(service.findAll()).toHaveLength(2);
  });

  it('should throw NotFoundException when removing missing item', () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
