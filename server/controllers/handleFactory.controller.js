const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

module.exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // Filter when in a specific book
    let filter = {};
    if (req.params.bookId) filter = { book: req.params.bookId };
    // executing query
    const apiFeatures = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .paginate()
      .sort()
      .limitFields();

    // const docs = await apiFeatures.query.explain();
    const docs = await apiFeatures.query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

module.exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const query = Model.findById(id);
    if (popOptions) query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

module.exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

module.exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

module.exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

module.exports.getTotals = Model =>
  catchAsync(async (_, res, next) => {
    const count = await Model.count();

    if (!count) return next(new AppError('No document found', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: count,
      },
    });
  });
