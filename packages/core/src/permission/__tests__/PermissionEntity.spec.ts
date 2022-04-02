import PermissionEntity from '../domain/PermissionEntity'

describe('testing the permission entity', () => {
  it('testing the properties of the permission entity', () => {
    const data = {
      id: 1231,
      name: 'test-parent',
      children: [
        {
          id: 1232,
          name: 'test-children',
          parentId: 1231
        }
      ]
    }

    const permissionEntity = new PermissionEntity(data)

    expect(permissionEntity.id).toBe(data.id)
    expect(permissionEntity.name).toBe(data.name)
    expect(permissionEntity.children).toHaveLength(data.children.length)
  })

  it('testing the children of the permission entity should be empty array if there is no children in data', () => {
    const data = {
      id: 1231,
      name: 'test-parent'
    }

    const permissionEntity = new PermissionEntity(data)

    expect(permissionEntity.id).toBe(data.id)
    expect(permissionEntity.name).toBe(data.name)
    expect(permissionEntity.children).toHaveLength(0)
  })
})
