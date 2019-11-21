const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async (
  {
    actions: { createNode },
    node,
    createContentDigest,
    store,
    cache,
    reporter,
  },
  { filter, nodeName = `localFile` }
) => {
  // asdf
  if (filter(node)) {
    const fileNode = await createRemoteFileNode({
      url: node.url,
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId: createContentDigest,
      reporter,
    })

    if (fileNode) {
      const fileNodeLink = `${nodeName}___NODE`
      node[fileNodeLink] = fileNode.id
    }
  }
}
