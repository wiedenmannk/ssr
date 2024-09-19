import { Message } from "primeng/api";
import { BehaviorSubject } from "rxjs";

export const toaster = new BehaviorSubject<Message | null>(null);
