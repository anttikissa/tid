// Crockford base32 but lower case (characters ILOU missing)
let alphabet5bit = '0123456789abcdefghjkmnpqrstvwxyz'
let alphabet6bit = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const dateCharacters : number = 9
const maxRandomCharacters : number = 15

// This should be less than 128 in order to fit in UUID format
// const bits = 6 + dateCharacters * 5 + maxRandomCharacters * 5
// console.log('Total bits', bits)

// Returns a TID of type `type` with at least `randomBits` bits randomness
// Random bits should be between 40 and 75 and it will be rounded up to the
// nearest multiple of 5
export function tid(type: string = '0', randomBits: number = 40) : string {
  if (type.length !== 1) {
    throw new Error('Type should be a single character')
  }
  if (alphabet6bit.indexOf(type) === -1) {
    throw new Error(`Type should be one of ${alphabet6bit}`)
  }
  let randomCharacters = Math.ceil(randomBits / 5)
  if (randomCharacters > maxRandomCharacters) {
    throw new Error('Too much randomness for id to fit in 128 bits')
  }

  // Construct the first 10 characters in reverse order
  let result : string = ''

  let t : number = Date.now()
  // The highest timestamp that can be represented with 45 bits is 2 ** 45 - 1,
  // that is 3084-12-12T12:41:28.831Z
  for (let i = 0; i < dateCharacters; i++) {
    let bits : number = t % 32
    t = Math.floor(t / 32)

    result = (alphabet5bit[bits]) + result
  }
  if (t !== 0) {
    throw new Error('Date overflow')
  }

  // Type goes first
  result = type + result

  // Finally append the random part
  const random = new Uint8Array(maxRandomCharacters)
  crypto.getRandomValues(random)
  for (let i = 0; i < randomCharacters; i++) {
    result = result + alphabet5bit[random[i] % 32]
  }

  return result
}

console.log(tid())
console.log(tid())
console.log(tid())
console.log(tid())
console.log(tid('u'))
console.log(tid('a'))
console.log(tid('w'))
console.log(tid('x', 70))

console.log(tid('a', 35))
console.log(tid('a', 70))

console.log('Length of one tid', tid().length)
