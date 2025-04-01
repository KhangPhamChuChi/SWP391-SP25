import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Card,
  Spin,
  Alert,
  Avatar,
  List,
  Button,
  message,
  Input,
  Upload,
} from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useGetCustomerProfile } from "../features/authentication/hooks/useGetCustomerProfile";
import { useBookingHistory } from "../features/user/hook/useBookingHistory";
import { BookingDto } from "../features/booking/dto/booking.dto";
import { PagePath } from "../enums/page-path.enum";
import useAuthStore from "../features/authentication/hooks/useAuthStore";
import dayjs from "dayjs";
import { useUpdateCustomer } from "../features/user/hook/useUpdateCustomer";
import { useLocation } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

const { Sider, Content } = Layout;
type TabKey = "personal" | "schedule";

const CustomerProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = (searchParams.get("tab") as TabKey) || "personal";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [uploading, setUploading] = useState(false);
  const { mutate: updateCustomer } = useUpdateCustomer();

  const {
    data: profileData,
    isPending,
    error,
    refetch,
  } = useGetCustomerProfile(user?.accountId, user?.role);

  const {
    data: bookings,
    isLoading: isBookingLoading,
    isError: isBookingError,
    error: bookingError,
  } = useBookingHistory();

  const profile = Array.isArray(profileData) ? profileData[0] : undefined;
  const customer = profile?.customer?.[0] ?? null;

  console.log("Profile Data:", JSON.stringify(profileData, null, 2));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    image: "",
  });

  const handleFireBaseUpload = (file: File) => {
    if (!file) {
      message.error("Vui lòng chọn một hình ảnh!");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setUploading(false);
        message.error(`Lỗi khi upload hình ảnh: ${error.message}`);
        console.error("Upload error:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, image: downloadURL })); // Cập nhật image vào formData
          setUploading(false);
          message.success("Upload hình ảnh thành công!");
        } catch (error) {
          setUploading(false);
          message.error("Lỗi khi lấy URL hình ảnh!");
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  useEffect(() => {
    if (user?.accountId) {
      refetch();
    }
  }, [user?.accountId, refetch]);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phoneNumber: customer.phoneNumber || "",
        image: customer.image || "",
      });
    }
  }, [customer]);

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
    navigate(`?tab=${key}`);
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = async () => {
    try {
      const updatedData = {
        customerId: customer?.customerId ?? 0,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        skintypeId: customer?.skintypeId ?? 0,
        accountId: customer?.accountId ?? profile?.accountId ?? 0,
        image: formData.image || "",
      };

      updateCustomer(updatedData);
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
      refetch();
    } catch {
      message.error("Cập nhật thông tin thất bại!");
    }
  };

  if (isPending) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error.message}</p>;
  }

  const handleNavigateToBookingDetail = (bookingId: number) => {
    navigate(`${PagePath.CUSTOMER_BOOKING_DETAIL}?tab=schedule`, {
      state: { bookingId },
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f1eb" }}>
      <Layout>
        <Sider width={250} theme="light" style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={(e) => handleTabChange(e.key)}
          >
            <Menu.Item key="personal" icon={<UserOutlined />}>
              Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="schedule" icon={<ClockCircleOutlined />}>
              Lịch sử đặt lịch
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: "24px", background: "#f5f1eb" }}>
          <Content
            style={{ padding: "24px", background: "#fff", borderRadius: "8px" }}
          >
            <Card title="Hồ sơ khách hàng" bordered={false}>
              {activeTab === "personal" && (
                <div style={{ textAlign: "center" }}>
                  {isEditing ? (
                    <>
                      <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleFireBaseUpload(file);
                          return false;
                        }}
                        accept="image/*"
                        disabled={uploading}
                      >
                        <Avatar
                          size={100}
                          src={formData.image || customer?.image}
                          style={{ cursor: "pointer" }}
                        />
                        {uploading && <Spin style={{ marginTop: 10 }} />}
                      </Upload>
                      <div
                        style={{
                          textAlign: "left",
                          maxWidth: 400,
                          margin: "0 auto",
                        }}
                      >
                        <label>
                          <strong>Họ và tên</strong>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          style={{ marginBottom: 10 }}
                        />

                        <label>
                          <strong>Email</strong>
                        </label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ marginBottom: 10 }}
                        />

                        <label>
                          <strong>Số điện thoại</strong>
                        </label>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          style={{ marginBottom: 10 }}
                        />

                        <Button type="primary" onClick={handleUpdateClick}>
                          Cập nhật
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          onClick={handleCancelClick}
                        >
                          Hủy
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar
                        size={100}
                        src={formData.image || customer?.image}
                      />
                      <h3 style={{ marginTop: 10 }}>{formData.name}</h3>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Số điện thoại:</strong> {formData.phoneNumber}
                      </p>
                      <p>
                        <strong>Tên tài khoản:</strong> {formData.name}
                      </p>
                      <Button type="primary" onClick={handleEditClick}>
                        Sửa thông tin
                      </Button>
                    </>
                  )}
                </div>
              )}

              {activeTab === "schedule" && (
                <>
                  {isBookingLoading ? (
                    <Spin tip="Đang tải lịch sử đặt lịch..." />
                  ) : isBookingError ? (
                    <Alert
                      message={
                        bookingError?.message || "Lỗi tải lịch sử đặt lịch"
                      }
                      type="error"
                    />
                  ) : bookings && bookings.length > 0 ? (
                    <List
                      itemLayout="horizontal"
                      dataSource={bookings}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40"],
                      }}
                      renderItem={(booking: BookingDto) => (
                        <List.Item
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleNavigateToBookingDetail(booking.bookingId)
                          }
                          actions={[
                            <Button
                              type="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigateToBookingDetail(
                                  booking.bookingId
                                );
                              }}
                            >
                              Xem Chi Tiết
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={`Dịch vụ: ${booking.serviceName}`}
                            description={`Ngày: ${dayjs(booking.date).format(
                              "DD-MM-YYYY"
                            )} | Trạng thái: ${booking.status} | Địa điểm: ${
                              booking.location
                            }`}
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Alert
                      message="Không có lịch sử đặt lịch."
                      type="warning"
                    />
                  )}
                </>
              )}
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CustomerProfile;
