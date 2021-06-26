const GithubAPI = require('../../../lib/github/api')
const Helper = require('../../../__fixtures__/unit/helper')

describe('listFiles', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.listFiles(Helper.mockContext({ files: ['abc.js', 'def.js'] }))

    expect(res.length).toEqual(2)
    expect(res[0]).toEqual({ filename: 'abc.js', additions: 0, deletions: 0, changes: 0, status: 'modified' })
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.pulls.listFiles.endpoint.merge = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.listFiles(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })

  describe('getContent', () => {
    test('return correct data if no error', async () => {
      const content = 'This is the content'
      const context = Helper.mockContext()
      context.octokit.repos.getContent = jest.fn().mockReturnValue({
        data: {
          content: Buffer.from(content).toString('base64')
        }
      })

      const res = await GithubAPI.getContent(context)
      expect(res).toEqual(content)
    })

    test('that 404 are simply returned null', async () => {
      const context = Helper.mockContext()
      context.octokit.repos.getContent = jest.fn().mockRejectedValue({ status: 404 })

      try {
        await GithubAPI.getContent(context)
      } catch (e) {
        // Fail test if it throws error
        expect(true).toBe(false)
      }
    })

    test('that error are re-thrown', async () => {
      const context = Helper.mockContext()
      context.octokit.repos.getContent = jest.fn().mockRejectedValue({ status: 402 })

      try {
        await GithubAPI.getContent(context)
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false)
      } catch (e) {
        expect(e.status).toBe(402)
      }
    })
  })
})

describe('createChecks', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.createChecks(Helper.mockContext())

    expect(res.data.id).toEqual(1)
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.checks.create = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.createChecks(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('updateChecks', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.updateChecks(Helper.mockContext())
    expect(res).toEqual({})
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.checks.update = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.updateChecks(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('listLabelsOnIssue', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.listLabelsOnIssue(Helper.mockContext({ labels: [{ name: 'one' }, { name: 'two' }] }))
    expect(res).toEqual(['one', 'two'])
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.listLabelsOnIssue = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.listLabelsOnIssue(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('addLabels', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.addLabels(Helper.mockContext())
    expect(res).toEqual('addLabels call success')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.addLabels = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.addLabels(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('setLabels', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.setLabels(Helper.mockContext())
    expect(res).toEqual('setLabels call success')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.setLabels = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.setLabels(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('addAssignees', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.addAssignees(Helper.mockContext({ labels: [{ name: 'one' }, { name: 'two' }] }))
    expect(res).toEqual('addAssignees call success')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.addAssignees = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.addAssignees(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('checkUserCanBeAssigned', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.checkUserCanBeAssigned(Helper.mockContext(), '1', 'testAssignee')
    expect(res).toEqual('testAssignee')
  })

  test('that 404 are simply returned null', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.checkUserCanBeAssigned = jest.fn().mockRejectedValue({ status: 404 })

    const res = await GithubAPI.checkUserCanBeAssigned(context, '1', 'testAssignee')
    expect(res).toEqual(null)
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.checkUserCanBeAssigned = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.checkUserCanBeAssigned(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('createComment', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.createComment(Helper.mockContext())
    expect(res).toEqual('createComment call success')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.createComment = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.createComment(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('listComments', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.listComments(Helper.mockContext({ listComments: [{ user: { login: 'mergeable[bot]' } }, { user: { login: 'userA' } }] }))
    expect(res.data.length).toEqual(2)
    expect(res.data[0].user.login).toEqual('mergeable[bot]')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.listComments = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.listComments(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('deleteComment', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.deleteComment(Helper.mockContext())
    expect(res).toEqual('deleteComment call success')
  })

  test('that error are NOT thrown for 404', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.deleteComment = jest.fn().mockRejectedValue({ status: 404 })

    try {
      await GithubAPI.deleteComment(context)
    } catch (e) {
      console.log(e)
      // Fail test if error was thrown
      expect(true).toBe(false)
    }
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.deleteComment = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.deleteComment(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('updateIssues', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.updateIssues(Helper.mockContext())
    expect(res).toEqual('update Issues call success')
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.update = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.updateIssues(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('getIssues', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.getIssues(Helper.mockContext({ deepValidation: 'get Issue success' }))
    expect(res.data).toEqual('get Issue success')
  })

  test('that 404 are simply returned null', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.getIssue = jest.fn().mockRejectedValue({ status: 404 })

    try {
      await GithubAPI.getIssues(context)
    } catch (e) {
      // Fail test if it throws error
      expect(true).toBe(false)
    }
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.issues.get = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.getIssues(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('listMembersInOrg', () => {
  test('return correct data if no error', async () => {
    const members = [
      { login: 'member1' },
      { login: 'member2' }
    ]

    const res = await GithubAPI.listMembersInOrg(Helper.mockContext({ listMembers: members }))
    expect(res).toEqual(['member1', 'member2'])
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.teams.listMembersInOrg = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.listMembersInOrg(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('getMembershipForUserInOrg', () => {
  test('return correct data if no error', async () => {
    let res = await GithubAPI.getMembershipForUserInOrg(Helper.mockContext())
    expect(res).toEqual(false)

    res = await GithubAPI.getMembershipForUserInOrg(Helper.mockContext({ membership: 'active' }))
    expect(res).toEqual(true)
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.teams.getMembershipForUserInOrg = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.getMembershipForUserInOrg(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('projectListColumns', () => {
  test('return correct data if no error', async () => {
    const projectColumns = [
      { id: '1' },
      { id: '2' }
    ]

    const res = await GithubAPI.projectListColumns(Helper.mockContext({ projectColumns }))
    expect(res).toEqual(['1', '2'])
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.projects.listColumns = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.projectListColumns(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('projectListForRepo', () => {
  test('return correct data if no error', async () => {
    const repoProjects = [
      { name: 'Project One', id: 1 },
      { name: 'Project Two', id: 2 }
    ]

    const res = await GithubAPI.projectListForRepo(Helper.mockContext({ repoProjects }))
    expect(res).toEqual(repoProjects)
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.projects.listForRepo = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.projectListForRepo(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('projectListCards', () => {
  test('return correct data if no error', async () => {
    const projectCards = [
      { content_url: 'testRepo/issues/1' },
      { content_url: 'testRepo/issues/2' }
    ]

    const res = await GithubAPI.projectListCards(Helper.mockContext({ projectCards }))
    expect(res).toEqual({ data: projectCards })
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.projects.listCards = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.projectListCards(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})