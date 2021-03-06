import API from './api';
import CurveError from './error';

/**
 * Document class
 * @memberof BaaS
 * @public
 */
export default class Document {
  private readonly collection: string;
  private readonly documentId: string;
  private document: genericObject;
  private where: genericObject;

  constructor(collection: string, documentId?: string, where?: genericObject) {
    this.collection = collection;
    this.documentId = documentId;
    this.where = where;
    this.init();
  }

  private init(): void {
    this.document = {
      $set: {},
      $unset: [],
    };
  }

  /**
   * Set document data
   * @param data
   * @returns this
   */
  set(data: genericObject = {}): Document {
    this.document.$set = Object.assign(this.document.$set, data);
    return this;
  }

  /**
   * Remove fields of a document
   * @param data fields to remove
   */
  unset(data: string | string[]): Document {
    if (typeof data === 'string') {
      data = [data];
    }

    this.document.$unset = data;
    return this;
  }

  /**
   * Create a new document in a collection
   * @returns document info from server side
   */
  async save(): Promise<void> {
    return await API.collection.create({
      params: { collection: this.collection },
      data: this.document.$set,
    });
  }

  /**
   * Update a document of a collection
   * @returns a promise
   */
  async update(): Promise<void> {
    if (!this.documentId) {
      throw new CurveError(601);
    }

    return await API.collection.update({
      params: {
        collection: this.collection,
        documentId: this.documentId,
      },
      data: { data: this.document },
    });
  }

  /**
   * Update multiple documents of a collection
   * @returns a promise
   */
  async updateMany(): Promise<void> {
    return await API.collection.updateMany({
      params: { collection: this.collection },
      data: {
        where: this.where,
        data: this.document,
      },
    });
  }
}
