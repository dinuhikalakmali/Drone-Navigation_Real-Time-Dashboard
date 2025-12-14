import { Container } from 'react-bootstrap';
import AssetsList from '@/views/asset/assets-list/all-assets/AssetsList';
import PageBreadcrumb from '@/components/PageBreadcrumb';
const Index = () => {
  return <Container fluid>
      <PageBreadcrumb title="Add Reports" subtitle="reports" />
      <AssetsList/>
    </Container>;
};
export default Index;