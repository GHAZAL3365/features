export const getList = async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;

    page = page < 1 ? 1 : page;
    limit = limit > 10 ? 10 : limit;

    const skip = (page - 1) * limit;

    const totalItems = await Item.countDocument();

    const totalPages = Math.ceil(totalItems / limit);

    const itemPerpage = await Item.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: success,
      message: "data fetched successfully",
      data: itemPerpage,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    });
  } catch (err) {
    res.status(400).json({
        status: "fail",
        message: "Errr" + err.message
        
    })
  }
};
