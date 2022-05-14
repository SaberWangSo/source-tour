import { describe, expect, it, test } from 'vitest'
import { isReactive, reactive, shallowReactive } from '../src'

describe('测试响应式', () => {
  it('响应式对象', () => {
    const original = { foo: 1, bar: { name: '大圣' } }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(isReactive(observed.foo)).toBe(false)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
    // get
    expect(observed.foo).toBe(1)
    // has
    expect('foo' in observed).toBe(true)
    // ownKeys
    expect(Object.keys(observed)).toEqual(['foo', 'bar'])
    // delete
    delete observed.foo
    expect('foo' in observed).toBe(false)
    // deep reactive
    expect(observed.bar.name).toBe('大圣')
    expect(isReactive(observed.bar)).toBe(true)
  })
  it('浅层响应式', () => {
    const original = { foo: 1, bar: { name: '大圣' } }
    const observed = shallowReactive(original)
    expect(isReactive(observed.foo)).toBe(false)
    expect(isReactive(observed)).toBe(true)
    // getter
    expect(observed.bar.name).toBe('大圣')
  })
  it('为啥用WeakMap',()=>{
    const map = new Map()
    const weakmap = new WeakMap()
    //立即执行
    ~(function(){
      const foo = { name:'大圣' }
      const bar = { name:'小圣' }
      map.set(foo,'1')
      weakmap.set(bar,'小圣')
    }())
    expect(map.size).toEqual(1) 
    //weakmap会被回收
  })
})
