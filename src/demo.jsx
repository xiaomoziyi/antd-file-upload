import { Form } from 'antd';
import React from 'react';
import FileUpload from './FileUpload';
import { UPLOAD_TYPE } from './FileUpload/fileUtils';
import 'antd/dist/antd.css';
import UploadOutlined from '@ant-design/icons/UploadOutlined';

const ACTION = `https://mock.apifox.cn/m1/1961007-0-default/api/v1/file/upload`;
const ZIPACTION = `https://mock.apifox.cn/m1/1961007-0-default/api/v1/file/upload/compressed-file`;
const request = (action, props) => {
  console.log('action', action, 'props', props);
  return Promise.resolve({
    code: 0,
    data: { fileKey: 'sss', fileName: 'xxx.jpg' },
  });
};
const fetchXXX = () => {
  return Promise.resolve({
    code: 0,
    data: { fileKey: 'sss', fileName: 'xxx.jpg' },
  });
};
export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form
      onValuesChange={(_, a) => {
        console.log('all', a);
      }}
      form={form}
    >
      <Form.Item label="按钮文件上传" name="file1">
        <FileUpload
          accept={[]}
          fileLen={10}
          uploadType={UPLOAD_TYPE.BUTTON.code}
          action={ACTION}
          tooltipTitle=""
        />
      </Form.Item>
      <Form.Item label="图片上传" name="file2">
        <FileUpload
          accept={['jpg', 'jpeg', 'png']}
          fileLen={10}
          uploadType={UPLOAD_TYPE.PICTURE.code}
          action={ACTION}
          tooltipTitle=""
        />
      </Form.Item>
      <Form.Item label="图片裁剪上传" name="file22">
        <FileUpload
          accept={['jpg', 'jpeg', 'png']}
          fileLen={10}
          uploadType={UPLOAD_TYPE.PICTURE.code}
          action={ACTION}
          crop
          tooltipTitle=""
          imgCropProps={{}} // 裁剪属性
        />
      </Form.Item>
      <Form.Item label="文件拖拽上传" name="file3">
        <FileUpload
          accept={['jpg', 'jpeg', 'png']}
          fileLen={10}
          uploadType={UPLOAD_TYPE.DRAG.code}
          action={ACTION}
          tooltipTitle=""
        />
      </Form.Item>
      <Form.Item label="自定义文件上传" name="file4">
        <FileUpload
          fileLen={10}
          accept={[]}
          uploadType={UPLOAD_TYPE.CUSTOM.code}
          action={ACTION}
          transferBlob
          reqFileMap={{ file: 'contentBase64', fileName: 'originName' }}
          customUpload
          request={request}
          extraParams={{ recordId: 2 }} // 上传文件其他参数，如传给后端需要当前记录recordId
        >
          <a>
            <UploadOutlined /> 上传
          </a>
        </FileUpload>
      </Form.Item>
      <Form.Item label="压缩包解压文件上传" name="file5">
        <FileUpload
          fileLen={10}
          uploadType={UPLOAD_TYPE.BUTTON.code}
          accept={['zip', 'jpeg', 'png', 'pdf', 'xlsx', 'xls']}
          action={ACTION}
          tooltipTitle="仅支持zip，jpeg, png, pdf"
          unZipAction={ZIPACTION}
          unZipFile
        />
      </Form.Item>
      <Form.Item label="自定义文件上传方法（传入request）" name="file9">
        <FileUpload
          fileLen={10}
          uploadType={UPLOAD_TYPE.BUTTON.code}
          accept={['zip', 'jpeg', 'png', 'pdf']}
          action={ACTION}
          tooltipTitle="仅支持zip，jpeg, png, pdf"
          customUpload
          request={request}
        />
      </Form.Item>
      <Form.Item label="自定义文件上传方法(传入异步函数）" name="file10">
        <FileUpload
          fileLen={10}
          uploadType={UPLOAD_TYPE.BUTTON.code}
          accept={['zip', 'jpeg', 'png', 'pdf']}
          action={ACTION}
          tooltipTitle="仅支持zip，jpeg, png, pdf"
          ignoreAction
          customUpload
          request={(props) => {
            console.log('props', props);
            const { data, processData, method, config } = props;
            return fetchXXX({ data }); // 传入所需参数
          }}
        />
      </Form.Item>
    </Form>
  );
}
