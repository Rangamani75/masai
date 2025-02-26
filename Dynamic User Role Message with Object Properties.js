let user1 = { name: "Alice", role: "admin", active: false }
let user2 = { name: "Bob", role: "user", active: true };
let user3 = { name: "Bob", role: "user", active: false};
let user4 = { name: "Alice", role: "admin", active: true }
let r=((user1.role=="admin") && (user1.active==true)) ? "admin accessed":"admin revoked"
console.log(r)
let s=((user4.role=="admin") && (user4.active==true)) ? "admin accessed":"admin revoked"
console.log(s)
let t=((user2.role=="user") && (user2.active==true)) ? "user accessed":"user revoked"
console.log(t)
let p=((user3.role=="user") && (user3.active==true)) ? "user accessed":"user revoked"
console.log(p)
