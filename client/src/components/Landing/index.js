import React from 'react';
import withSession from '../Session/withSession';
import { Editor as EditorWysiwyg} from 'react-draft-wysiwyg'
import { MessageCreate, Messages } from '../Message';
import { EditorState, convertFromRaw } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html';
import marthon from './marathon'

const contentStateHtml = stateFromHTML(`
  <p><strong>HCMC MARATHON 2019 powered by Taiwan Excellence</strong></p>
  <p>HCMC Marathon - Giải Marathon Tp. Hồ Chí Minh 2019, tiền thân là Giải Việt dã Tp. Hồ Chí Minh - HCMC Run, sẽ chính thức diễn ra vào ngày 13&nbsp;tháng 1 năm 2019. Giải do Pulse Active phối hợp cùng Liên đoàn Điền kinh Tp. Hồ Chí Minh tổ chức dưới sự chỉ đạo và hướng dẫn của Sở Văn hóa và Thể thao Tp. Hồ Chí Minh.</p>
  <p>Cổng đăng ký cự ly 5Km và các cự ly khác đã chính thức được mở. Chạy bộ không chỉ để chạm đến đích mà còn là không khí hào hứng, náo nhiệt xung quanh, là cảnh đẹp kích thích tinh thần người tham dự.</p>
  <p>Đường chạy dành cho cá nhân mới bắt đầu chạy bộ và muốn đặt mục tiêu chinh phục cự ly vừa sức 5km.&nbsp;</p>
  <p><br></p>
  <figure><img src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2017/10/02/FC2F88.jpg" height="auto" width="auto"/></figure>
  <p><strong>THỜI GIAN NHẬN KIT:</strong> 12/01/2018<br>
  &nbsp;</p>
  <p><strong>ĐỊA ĐIỂM NHẬN KIT:</strong> Đang cập nhật<br>
  <br>
  <strong>LƯU Ý:</strong></p>
  <ul>
    <li>Đối với đăng kí Online: Vui lòng mang theo email xác nhận + CMND/ giấy tờ tùy thân.&nbsp;</li>
    <li>Đối với đăng kí Offine: Vui lòng mang theo phiếu xác nhận đăng ký + CMND/ giấy tờ tùy thân.</li>
    <li>Đối với đăng ký với thẻ tạm trú: Vui lòng mang theo Thẻ tạm rú + email xác nhận/ hóa đơn đăng ký.</li>
    <li>Ban tổ chức sẽ cố gắng cung cấp size áo như đã chọn.&nbsp;Tuy nhiên, trong trường hợp không còn size khi bạn đến nhận Kit, mong bạn thông cảm và chuyển sang size khác.&nbsp;</li>
  </ul>
  <p>&nbsp;</p>
  <p><strong>LƯU Ý</strong></p>
  <p>1. Phí đăng ký dành cho người Việt Nam áp dụng cho:</p>
  <p>Công dân mang quốc tịch Việt Nam. - Người nước ngoài có thẻ tạm trú tại Việt Nam (vui lòng mang theo thẻ tạm trú khi đến nhận kit, BTC không chấp nhận những giấy tờ tùy thân khác như hộ chiếu, v.v. Trong trường hợp không mang theo thẻ tạm trú, người đăng ký sẽ phải trả khoản chênh lệch giữa phí quốc tế và phí Việt Nam)</p>
  <p>2. Số lượng đăng ký có giới hạn nên BTC sẽ đóng đăng ký ngay khi đủ số lượng.</p>
  <p>3. Những người tham gia chạy 5KM, 10KM bắt buộc phải mặc áo phông HCMC Marathon do BTC cung cấp.​</p>
  <p>&nbsp;</p>
  <p><strong>QUY ĐỊNH THAM GIA</strong></p>
  <ul>
    <li>Phí tham gia sẽ không được hoàn trả với bất kì lý do gì.</li>
    <li>Thí sinh không được phép chuyển nhượng quyền tham gia và số hiệu đăng ký BIB cho người khác.</li>
    <li>Các trường hợp chuyển nhượng sẽ được xem là đăng ký không hợp lệ.&nbsp;</li>
    <li>Đăng ký không hợp lệ sẽ không được hưởng các quyền lợi của người tham gia và không được xem xét về kết quả sau cuộc đua.</li>
    <li>Các trường hợp tham gia miễn phí sẽ không được nhận giải thưởng từ sự kiện (bao gồm các suất tham gia từ các đơn vị tài trợ, đối tác,…)&nbsp;</li>
    <li>Ban tổ chức có quyền từ chối hoặc chấm dứt đăng ký đối với những thí sinh cung cấp thông tin không đúng sự thật, không chính xác, không trung thực hoặc không đầy đủ.&nbsp;</li>
    <li>Trẻ em dưới 18 tuổi sẽ không được đăng ký tham gia cự ly 42km và 21km.</li>
    <li>Ở cự ly 10km và 5km, trường hợp người tham gia chưa đủ 18 tuổi, vui lòng in và điển đầy đủ mẫu đơn chấp thuận của cha mẹ/người giám hộ tại đây&nbsp;Giấy chấp thuận&nbsp;và mang theo khi đến nhận race kit.</li>
    <li>Quyết định của ban tổ chức là quyết định cuối cùng.&nbsp;</li>
  </ul>
`)

const contentStateDraft = convertFromRaw(marthon)

const htmlEditorState = EditorState.createWithContent(contentStateHtml)
const DraftEditorState = EditorState.createWithContent(contentStateDraft)


const Landing = ({ session }) => (
  <div>
    <h2>Landing Page</h2>

    {session && session.me && <MessageCreate />}
    <Messages me={session.me} limit={2} />
    <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
      <EditorWysiwyg editorState={htmlEditorState} readOnly toolbarHidden />
    </div>
    <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
      <EditorWysiwyg editorState={DraftEditorState} readOnly toolbarHidden />
    </div>
  </div>
);

export default withSession(Landing)