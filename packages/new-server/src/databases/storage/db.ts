import { IStorageController } from '@interfaces/storage.interface';
import mongoose, { Types } from 'mongoose';

export default class DB<T extends mongoose.Document>
  implements IStorageController<T>
{
  private model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }
  async create(query: string, data: T): Promise<T> {
    const create = await this.model.create({ ...data });
    await this.model.findByIdAndUpdate(create._id, {
      slug: create._id,
    });
    return create;
  }

  async update(id: string, data: T): Promise<T> {
    const update = await this.model.findById(id);
    await update.updateOne(
      {
        ...data,
      },
      { upsert: true },
    );
    return await this.model.findById(id);
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async findOne(query: {}): Promise<T> {
    return await this.model.findOne(query);
  }

  async findAll(query: {}): Promise<Array<T>> {
    return await this.model.find(query);
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne(new Types.ObjectId(id));
  }
}
