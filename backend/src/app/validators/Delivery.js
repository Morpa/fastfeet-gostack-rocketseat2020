import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      recipient_id: Yup.number()
        .integer()
        .required(),
      signature_id: Yup.number().integer(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
