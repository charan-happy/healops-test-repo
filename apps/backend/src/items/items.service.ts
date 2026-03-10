import { Injectable, NotFoundException } from '@nestjs/common';

export interface Item {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      name: 'Pipeline Monitor',
      description: 'Monitors CI/CD pipeline health',
      status: 'active',
      createdAt: '2026-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'Log Analyzer',
      description: 'Parses and classifies CI failure logs',
      status: 'active',
      createdAt: '2026-02-01T12:00:00Z',
    },
    {
      id: 3,
      name: 'Auto Fixer',
      description: 'Generates patches for common build failures',
      status: 'inactive',
      createdAt: '2026-03-05T08:00:00Z',
    },
  ];

  private nextId = 4;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  create(data: { name: string; description: string }): Item {
    const item: Item = {
      id: this.nextId++,
      name: data.name,
      description: data.description,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.items.push(item);
    return item;
  }

  remove(id: number): void {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    this.items.splice(index, 1);
  }
}
