function snipped(index) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
  }
}

class HashMap {
  static createBuckets(n) {
    return Array(n)
      .fill(null)
      .map(() => []);
  }

  loadfactor = 0.75;
  capacity = 16;
  length = 0;
  buckets = HashMap.createBuckets(this.capacity);

  grow() {
    const entries = this.entries();
    this.clear();
    this.buckets = this.buckets.concat(HashMap.createBuckets(this.capacity));
    this.capacity *= 2;
    for (const { key, value } of entries) {
      this.set(key, value);
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  traverse(key, onKeyFound, onKeyNotFound) {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];

    for (const index in bucket) {
      if (bucket[index].key === key) {
        return onKeyFound(bucket, index);
      }
    }

    return onKeyNotFound(bucket);
  }

  set(key, value) {
    const setValue = (bucket, index) => (bucket[index].value = value);
    const pushEntry = (bucket) => {
      bucket.push({ key, value });
      if (++this.length >= this.capacity * this.loadfactor) {
        this.grow();
      }
    };
    this.traverse(key, setValue, pushEntry);
  }

  get(key) {
    const returnValue = (bucket, index) => bucket[index].value;
    const returnNull = () => null;
    return this.traverse(key, returnValue, returnNull);
  }

  has(key) {
    const returnTrue = () => true;
    const returnFalse = () => false;
    return this.traverse(key, returnTrue, returnFalse);
  }

  remove(key) {
    const deleteEntry = (bucket, index) => {
      bucket.splice(index, 1);
      this.length--;
      return true;
    };
    const returnFalse = () => false;
    return this.traverse(key, deleteEntry, returnFalse);
  }

  clear() {
    this.buckets.forEach((bucket) => (bucket.length = 0));
    this.length = 0;
  }

  keys() {
    return this.buckets.reduce(
      (keys, bucket) => [...keys, ...bucket.map((entry) => entry.key)],
      []
    );
  }

  values() {
    return this.buckets.reduce(
      (values, bucket) => [...values, ...bucket.map((entry) => entry.value)],
      []
    );
  }

  entries() {
    return this.buckets.reduce(
      (entries, bucket) => [...entries, ...bucket.map((entry) => entry)],
      []
    );
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("kite", "grey");
test.set("lion", "bronze");

console.log(test.buckets);

test.set("moon", "silver");

console.log(test.buckets);
console.log(test.length);
console.log(test.get("grape"));
console.log(test.get("apple"));
console.log(test.get("kit"));
console.log(test.has("kite"));
console.log(test.has("kit"));
console.log(test.remove("doggo"));
console.log(test.remove("dog"));
console.log(test.remove("lion"));
console.log(test.remove("lion"));
console.log(test.length);
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
// console.log(test.clear());
console.log(test.buckets);
console.log(test.length);
