class DLLNode {
    next: DLLNode | null;
    prev: DLLNode | null;
    constructor(
        public val: number
    ) {
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    head: DLLNode | null;
    tail: DLLNode | null;
    length: number;
    constructor(arr?: number[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (arr) {
            this.#createFromArray(arr);
        }
    }

    #createFromArray(arr: number[]) {
        arr.forEach(x => {
            this.push(x)
        })
    }

    push(val: number) {
        let newNode = new DLLNode(val);
        if (!this.tail) {
            this.head = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.length++;
        this.tail = newNode;
    }

    unshift(val: number) {
        let newNode = new DLLNode(val);
        if (!this.head) {
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.head = newNode;
        this.length++;
    }

    pop() {
        if (!this.tail) {
            console.log("Linked List empty");
            return;
        }

        this.length--;
        if (!this.tail.prev) {
            this.tail = null;
            this.head = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

    }

    display() {
        if (!this.tail) {
            console.log("Linked List empty")
            return;
        }

        let displayStr = "";
        let curr = this.head;
        while (curr) {
            displayStr += curr.val + " ";
            curr = curr.next;
        }

        console.log(displayStr);
    }

    delete(val: number) {
        if (!this.tail) return;

        let curr = this.head;
        while (curr) {
            if (curr.val == val) {
                if (curr == this.head) {
                    this.head = this.head.next;
                }
                if (curr.next) {
                    curr.next.prev = curr.prev;
                }
                if (curr.prev) {
                    curr.prev.next = curr.next;
                }
                this.length--;
            }
            curr = curr.next;
        }
    }

    displayReverse() {
        if (!this.head) {
            console.log("LL empty")
            return;
        }
        let curr = this.tail;
        let displayStr = "";
        while (curr) {
            displayStr += curr.val + " ";
            curr = curr.prev;
        }

        console.log(displayStr);
    }

    insertBeforeAndAfter(target: number, val: number) {
        if (!this.tail) return;

        let curr = this.head;
        while (curr) {
            if (curr.val == target) {
                let beforeNode = new DLLNode(val)
                let afterNode = new DLLNode(val)

                if (curr == this.head) {
                    this.head = beforeNode;
                }
                if (curr.next) {
                    curr.next.prev = afterNode;
                }
                if (curr.prev) {
                    curr.prev.next = beforeNode;
                }

                beforeNode.next = curr;
                beforeNode.prev = curr.prev
                curr.prev = beforeNode;

                afterNode.next = curr.next;
                afterNode.prev = curr;
                curr.next = afterNode;

                curr = afterNode;
            }
            curr = curr.next;
        }
    }
}


let newList = new DoublyLinkedList([1, 2, 3, 1, 4, 1]);

// newList.display();
// newList.unshift(0)
newList.display();

// newList.delete(3)
// newList.display();
// newList.displayReverse()

newList.insertBeforeAndAfter(1, 100)
newList.display()
newList.delete(100)
newList.display()
