class SLLNode {
    next: SLLNode | null
    constructor(public val: number) {
        this.next = null;
    }
}

class SinglyLinkedList {
    length: number;
    head: SLLNode | null;
    tail: SLLNode | null;

    constructor(arr?: number[]) {
        this.length = 0;
        this.head = null;
        this.tail = null;
        if (arr) {
            this.createLinkedList(arr)
        }
    }

    createLinkedList(arr: number[]) {
        arr.forEach(x => {
            this.push(x)
        })
    }

    push(val: number) {
        let newNode = new SLLNode(val);
        if (!this.tail) this.head = newNode;
        else this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    display() {
        if (!this.head) console.log("Linked List empty")
        let curr = this.head;
        let displayString = "";
        while (curr) {
            displayString += curr.val + " ";
            curr = curr.next;
        }
        console.log(displayString)
    }

    pop() {
        // case where there is not element
        if (!this.head) return;

        this.length--;

        // when there is only one element
        if (!this.head.next) {
            let temp = this.head.val;
            this.head = null;
            this.tail = null;
            return temp;
        }

        // when there is more than one element;
        let curr = this.head;
        while (curr.next?.next) {
            curr = curr.next;
        }
        let temp = curr.next?.val;
        curr.next = null;
        this.tail = curr;
        return temp;
    }

    unshift(val: number) {
        let newNode = new SLLNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    delete(val: number) {
        if (!this.head) console.log("LinkedLIst is empty")

        let curr = this.head;
        let prev: SLLNode | null = null;
        while (curr) {
            if (curr.val == val) {
                if (!prev) {
                    this.head = curr.next;
                }
                else {
                    prev.next = curr.next;
                }
                this.length--;
            }

            prev = curr;
            curr = curr.next;
        }
    }

    insertBeforeAndAfter(valToInsert: number, target: number) {
        if (!this.head) return;

        let curr: SLLNode | null = this.head;
        let prev: SLLNode | null = null;
        while (curr) {
            if (curr.val == target) {
                this.length += 2;

                let newNodeBefore = new SLLNode(valToInsert)
                let newNodeAfter = new SLLNode(valToInsert);

                newNodeBefore.next = curr;
                newNodeAfter.next = curr.next;
                curr.next = newNodeAfter;
                if (!prev) {
                    // curr = head;
                    this.head = newNodeBefore;
                }
                else {
                    // curr = some other node;
                    prev.next = newNodeBefore;
                }
                prev = newNodeAfter;
                curr = newNodeAfter.next;
            }
            else {
                prev = curr
                curr = curr.next;
            }
        }
    }

    printReverse() {
        if (!this.head) return;
        let displayString = '';
        function helper(curr: SLLNode | null) {
            if (!curr) return;
            helper(curr.next)
            displayString += curr.val + " ";
        }
        helper(this.head)
        console.log(displayString)
    }

    removeDuplicates() {
        let map: any = {};

        let curr = this.head;
        let prev: SLLNode | null = null;
        while (curr) {
            if (map[curr.val] && prev) {
                this.length--;
                prev.next = curr.next;
            }
            else {
                map[curr.val] = true
                prev = curr;
            }
            curr = curr.next;
        }
    }

    get size() {
        return this.length;
    }

}


let newLinkedList = new SinglyLinkedList([10, 20, 30, 10]);
newLinkedList.display()
console.log(newLinkedList.size)


// newLinkedList.delete(10)
newLinkedList.insertBeforeAndAfter(99, 10)
newLinkedList.display()
newLinkedList.removeDuplicates();
newLinkedList.display()
// newLinkedList.printReverse()
console.log(newLinkedList.size)