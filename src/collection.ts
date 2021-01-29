import API from './api';
import Document from './document';
import Query from './query';

/**
 * Collection class
 * @memberof BaaS
 * @public
 */
class Collection extends Query {
  private collection: string;

  constructor(collection: string) {
    super();
    this.collection = collection;
  }

  /**
   * Create an empty document
   * @returns a new document with collection id
   */
  create(): Document {
    return new Document(this.collection);
  }

  /**
   * Create multiple documents
   * @returns a number of documents created
   */
  async createMany(data: genericObject[]): Promise<void> {
    return await API.collection.createMany({ collection: this.collection }, data);
  }

  /**
   * Get a document without data
   * @param documentId
   * @returns an empty document with collection id and document id
   */
  getWithoutData(documentId?: string): Document {
    if (documentId) {
      return new Document(this.collection, documentId);
    } else {
      return new Document(this.collection, null, this.query);
    }
  }

  /**
   * Get documents of a collection
   * @returns documents of a collection
   */
  async find(): Promise<void> {
    const data = {
      pageSize: this.pageSize,
      pageNo: this.pageNo,
      exclude: this.excluded.join(),
      sortOrder: this.order,
      query: JSON.stringify(this.query),
    };
    return await API.collection.getCollection({ collection: this.collection }, data);
  }

  /**
   * Get a document of a collection
   * @param documentId
   * @returns document details
   */
  async findOne(documentId: string): Promise<void> {
    return await API.collection.getDocument(
      {
        collection: this.collection,
        documentId,
      },
      { exclude: this.excluded.join() }
    );
  }

  /**
   * Remove a document from a collection
   * @param documentId
   * @returns ok
   */
  async remove(documentId: string): Promise<void> {
    return await API.collection.remove({
      collection: this.collection,
      documentId,
    });
  }

  /**
   * Count documents of a collection
   */
  async count(): Promise<void> {
    return await API.collection.count({
      collection: this.collection,
    });
  }
}

export default Collection;
